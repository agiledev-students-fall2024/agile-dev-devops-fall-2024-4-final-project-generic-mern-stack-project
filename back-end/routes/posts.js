const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const Post = require('../models/Post'); 
const User = require('../models/User');

// Create a new post

router.post( '/create', passport.authenticate('jwt', {session: false}), 
    [ check('title', 'Title is required').not().isEmpty(), check('content', 'Content is required').not().isEmpty(), ], 
    async (req, res) => { const errors = validationResult(req); if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); } 
    try { 
        const newPost = new Post({
            title: req.body.title, 
            author: req.user.id, 
            content: req.body.content, 
            photo: req.body.photo || '', 
            date: new Date().toISOString(), }); 
        const savedPost = await newPost.save(); res.status(201).json({ message: 'Post created successfully', post: savedPost }); } 
    catch (err) { console.error(err.message); res.status(500).send('Server Error'); } } );



// Edit an existing post

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const {id} = req.params;
  const { title, content, photo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Post ID.' });
  }

  try {
    // Fetch the post to update
    const post = await Post.findById(id).populate('author').exec();
    console.log(post)

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Ensure the logged-in user is the author of the post
    const userID = mongoose.Types.ObjectId(req.user._id);
    if (!post.author.equals(userId)) {
      return res.status(403).json({ message: 'You are not authorized to edit this post.' });
    }

    // Update the post
    post.title = title || post.title;
    post.content = content || post.content;
    post.photo = photo || post.photo;

    const updatedPost = await post.save();

    res.status(200).json({message: 'Post updated successfully', updatedPost});
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




// Fetch a single post
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Post ID format.' });
  }

  try {
    const post = await Post.findById(id).populate('author').exec();
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json({post:post, loggedin:req.user});
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;
