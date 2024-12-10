const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const multer = require('multer');
const { body, validationResult } = require('express-validator')
const User = require('../models/User.js')
const Blocked = require('../models/Blocked.js')
const Friendship = require('../models/Friendship.js')
const FriendRequest = require('../models/FriendRequest');
const Post = require('../models/Post.js')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get('/edit', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const user = JSON.parse(JSON.stringify(req.user))
        delete user.password
        delete user.__v
        delete user._id
        return res.status(200).json(user);
    }
)

router.put('/edit', 
    passport.authenticate('jwt', { session: false }), 
    upload.single('profileImg'),
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required.')
            .isLength({ min:1, max: 50 })
            .withMessage('Name must be between 1 and 50 characters.'),
        body('bio')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Bio should be a maximum of 500 characters.'),
        body('layout')
            .notEmpty()
            .withMessage('Layout is required.')
            .isIn(['list', 'list-title', 'masonry', 'masonry-title', 'grid'])
            .withMessage('Invalid layout option.'),
        body('profileImg').custom((value, { req }) => {
            const file = req.file
            if (file){
                const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png',];
                if (!allowedTypes.includes(file.mimetype)) {
                    throw new Error('File must be a JPG, JPEG, or a PNG.');
                }
            }
            return true; 
        })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                message: errors.array()[0].msg 
            })
        }

        try {
            const user = await User.findOne({ username: req.user.username })
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found' 
                })
            }
            
            user.name = req.body.name || user.name
            user.bio = req.body.bio
            user.layout = req.body.layout || user.layout
            user.profilePicture = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : user.profilePicture
        
            await user.save()
            return res.status(200).json({ 
                success: true,
                message: 'Your profile was successfully updated',
                username: user.username,
            })
        } catch (err) {
            return res.status(500).json({ 
                success: false,
                message: 'An error occurred', error: err 
            })
        }
    }
)

router.get( '/user/:username', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const belongsToLoggedIn = req.user.username === req.params.username
        const username = belongsToLoggedIn ? req.user.username : req.params.username
        try {
            const user = await User.findOne({ username: username }).select('-password -__v').exec()
            if (!user){
                return res.status(404).json({ 
                    success: false,
                    error: 'User not found' 
                })
            } 

            const posts = await Post.find({author: user.id}).exec()
            let rel = 'NONE'

            if (!belongsToLoggedIn){
                const blocked = (await Blocked.find({
                    $or: [
                        { blocker: req.user._id, blocked: user.id },
                        { blocker: user.id, blocked: req.user._id }
                    ]
                }).exec()).length > 0

                if (blocked) {
                    return res.status(404).json({ 
                        success: false,
                        error: 'User is blocked or has blocked you' 
                    })
                }

                const friends = (await Friendship.find({
                    $or: [
                        { user1: req.user._id, user2: user.id },
                        { user1: user.id, user2: req.user._id }
                    ]
                }).exec()).length > 0
                
                const incomingRequest = (await FriendRequest.find({ to: user._id }).exec()).length > 0
                const outgoingRequest = (await FriendRequest.find({ from: user._id }).exec()).length > 0

                if (friends){
                    rel = 'FRIENDS'
                } else {
                    if (incomingRequest){
                        rel = 'INCOMING'
                    } else if (outgoingRequest){
                        rel = 'OUTGOING'
                    }
                }
            }
            return res.status(200).json({ 
                success: true,
                belongsToLoggedIn, user, posts, rel
            })
        
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching user data.',
                error: err,
            })
        }
    }
)

module.exports = router;
