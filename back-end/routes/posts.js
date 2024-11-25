

const express = require('express');
const router = express.Router();

// Mock data (simulated database tables)
const postsData = require('../fillerData/posts');
const loggedInData = require('../fillerData/loggedIn');
const usersData = require('../fillerData/users');

// Current user ID (replace with actual authentication logic later)
const CURRENT_USER_ID = loggedInData[0].id;

// Create a new post
router.post('/create', (req, res) => {
    const { title, content, imageUrl } = req.body;
    
    // Validate data
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Create new post object
    const newPost = {
        id: postsData.length + 1,
        title,
        content,
        author_id: CURRENT_USER_ID,
        date: new Date().toISOString(),
        imageUrl: imageUrl || '',
        comments: []
    };

    // Add new post to posts array
    postsData.push(newPost);

    return res.status(201).json({ message: 'Post created successfully', post: newPost });
});

// Edit an existing post
router.put('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, imageUrl } = req.body;

    // Find the post by ID
    const postIndex = postsData.findIndex(post => post.id === postId && post.author_id === CURRENT_USER_ID);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found or you do not have permission to edit this post.' });
    }

    // Update post details
    if (title) postsData[postIndex].title = title;
    if (content) postsData[postIndex].content = content;
    if (imageUrl) postsData[postIndex].imageUrl = imageUrl;
    postsData[postIndex].date = new Date().toISOString(); // Update date to reflect modification

    return res.status(200).json({ message: 'Post updated successfully', post: postsData[postIndex] });
});

// Fetch a single post (useful for editing)
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsData.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
});

module.exports = router;




// //Sprint 3 code

// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth');
// const Post = require('../models/Post');

// // Create a new post
// router.post('/create',
//   [
//     auth,
//     check('title', 'Title is required').not().isEmpty(),
//     check('content', 'Content is required').not().isEmpty()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { title, content } = req.body;
//     try {
//       const newPost = new Post({
//         title,
//         content,
//         author: req.user.id  // Assuming req.user is set by the auth middleware
//       });

//       await newPost.save();
//       res.status(201).json({ message: 'Post created successfully', post: newPost });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

// // Edit an existing post
// router.put('/edit/:id',
//   [
//     auth,
//     check('title', 'Title is optional').optional().isLength({ min: 1 }),
//     check('content', 'Content is optional').optional().isLength({ min: 1 })
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { title, content } = req.body;
//       const post = await Post.findById(req.params.id);

//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }

//       if (post.author.toString() !== req.user.id) {
//         return res.status(401).json({ message: 'User not authorized' });
//       }

//       if (title) post.title = title;
//       if (content) post.content = content;

//       await post.save();
//       console.log(`Post updated successfully: ${post._id}`);
//       res.status(200).json({ message: 'Post updated successfully', post });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

// module.exports = router;
