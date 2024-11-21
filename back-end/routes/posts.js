

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



// // Corrected version of routes/posts.js

// // Importing necessary modules for backend use only
// const express = require('express');
// const router = express.Router();

// // Assuming there's a data file named posts.js in a 'data' directory
// const posts = require('../data/posts');

// // Route to get all posts
// router.get('/', (req, res) => {
//   try {
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // Route to get a single post by id
// router.get('/:id', (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = posts.find((p) => p.id === postId);
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).send('Post not found');
//     }
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // Route to create a new post
// router.post('/create', (req, res) => {
//   try {
//     const newPost = req.body;
//     posts.push(newPost);
//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;