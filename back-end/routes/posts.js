// const express = require('express');
// const router = express.Router();

// // Mock data (simulated database tables)
// const postsData = require('../fillerData/posts');
// const loggedInData = require('../fillerData/loggedIn');
// const usersData = require('../fillerData/users');

// // Current user ID (replace with actual authentication logic later)
// const CURRENT_USER_ID = loggedInData[0].id;

// // Create a new post
// router.post('/create', (req, res) => {
//     const { title, content, imageUrl } = req.body;
    
//     // Validate data
//     if (!title || !content) {
//         return res.status(400).json({ message: 'Title and content are required.' });
//     }

//     // Create new post object
//     const newPost = {
//         id: postsData.length + 1,
//         title,
//         content,
//         author_id: CURRENT_USER_ID,
//         date: new Date().toISOString(),
//         imageUrl: imageUrl || '',
//         comments: []
//     };

//     // Add new post to posts array
//     // CHANAGE THIS LINE TO PUSH TO THE DATABASE
//     postsData.push(newPost);

//     return res.status(201).json({ message: 'Post created successfully', post: newPost });
// });

// // Edit an existing post
// router.put('/edit/:id', (req, res) => {
//     const postId = parseInt(req.params.id);
//     const { title, content, imageUrl } = req.body;

//     // Find the post by ID
//     const postIndex = postsData.findIndex(post => post.id === postId && post.author_id === CURRENT_USER_ID);

//     if (postIndex === -1) {
//         return res.status(404).json({ message: 'Post not found or you do not have permission to edit this post.' });
//     }

//     // Update post details
//     if (title) postsData[postIndex].title = title;
//     if (content) postsData[postIndex].content = content;
//     if (imageUrl) postsData[postIndex].imageUrl = imageUrl;
//     postsData[postIndex].date = new Date().toISOString(); // Update date to reflect modification

//     return res.status(200).json({ message: 'Post updated successfully', post: postsData[postIndex] });
// });

// // Fetch a single post (useful for editing)
// router.get('/:id', (req, res) => {
    // const postId = parseInt(req.params.id);
    // const post = postsData.find(post => post.id === postId);

//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }

//     return res.status(200).json(post);
// });

// module.exports = router;








// //Sprint 3 code first try

// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken'); //config
// const auth = require('../routes/authentication');
// const Post = require('../models/Post'); //linking to my schema here, schema is how you connect stuff

// // Create a new post
// router.post('/createnewblogpost/user',
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

//     try {
//       const newPost = new Post({
//         title: req.body.title,
//         content: req.body.content,
//         author: req.user._id, // Assuming req.user is set by the auth middleware
//         photo: req.body.photo || ''
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




//sprint 3 second try




const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
require('../config/jwt-config'); // Ensure this correctly imports your JWT strategy
const Post = require('../models/Post'); 
const User = require('../models/User');


// Middleware to authenticate using JWT with passport
// const validateObjectId = (req, res, next) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid ID format' });
//     }
//     next();
//   };

// Create a new post
//NEED TO ADD AN ID SECTION TO THIS AND FIGURE OUT HOW TO INCREMENT IT
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
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), async (req,res) =>

  [
    authenticateJWT,
    check('title', 'Title is optional').optional().isLength({ min: 1 }),
    check('content', 'Content is optional').optional().isLength({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      post.photo = req.body.photo || post.photo;

      await post.save();
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Fetch a single post
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Post ID format.' });
  }

  try {
    const post = await Post.findById(id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;


//BIG ISSUE IS HOW WE ARE GETTING THE USER ID AND HOW TO IMPLEMENT THE AUTHENTICATION
//FIGURE OUT HOW TO CONNECT THE USER.JS FILE AND FETCH THE LOGGEDIN USER INFORMATION TO USE AS THE AUTHOR




// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const passport = require('passport');
// require('../config/jwt-config'); // Ensure this correctly imports your JWT strategy
// const Post = require('../models/Post'); 
// // const User = require('../models/User');

// // Middleware to authenticate using JWT with passport
// // const authenticateJWT = passport.authenticate('jwt', { session: false });

// // Create a new post
// //NEED TO ADD AN ID SECTION TO THIS AND FIGURE OUT HOW TO INCREMENT IT
// router.post( '/create', [ check('title', 'Title is required').not().isEmpty(), check('content', 'Content is required').not().isEmpty(), ], async (req, res) => { const errors = validationResult(req); if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); } try { const newPost = new Post({title: req.body.title, author: "spongebob", content: req.body.content, photo: req.body.photo || '', date: new Date().toISOString(), }); const savedPost = await newPost.save(); res.status(201).json({ message: 'Post created successfully', post: savedPost }); } catch (err) { console.error(err.message); res.status(500).send('Server Error'); } } );
// // router.post(
// //     '/create',
// //     [
// //       check('title', 'Title is required').not().isEmpty(),
// //       check('content', 'Content is required').not().isEmpty(),
// //     ],
// //     async (req, res) => {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //       }
  
// //       try {
// //         // Assuming req.user.id is available through authentication middleware
// //         const userId = req.user?.id || req.body.author; // Either from authenticated user or passed in the body
  
// //         // Ensure the provided userId is a valid ObjectId
// //         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
// //           return res.status(400).json({ message: 'Invalid author ID' });
// //         }
  
// //         // Check if the user exists
// //         const authorExists = await User.findById(userId);
// //         if (!authorExists) {
// //           return res.status(404).json({ message: 'Author not found' });
// //         }
  
// //         // Create a new post
// //         const newPost = new Post({
// //           title: req.body.title,
// //           author: userId, // Use the ObjectId of the user
// //           content: req.body.content,
// //           photo: req.body.photo || '', // Optional photo field
// //           createdAt: new Date(),
// //         });
  
// //         const savedPost = await newPost.save();
// //         res.status(201).json({
// //           message: 'Post created successfully',
// //           post: savedPost,
// //         });
// //       } catch (err) {
// //         console.error(err.message);
// //         res.status(500).send('Server Error');
// //       }
// //     }
// //   );

// // Edit an existing post
// router.put('/edit/:id', passport.authenticate('jwt', {session: false}), async (req,res) =>

//   [
//     // authenticateJWT,
//     check('title', 'Title is optional').optional().isLength({ min: 1 }),
//     check('content', 'Content is optional').optional().isLength({ min: 1 })
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const post = await Post.findById(req.params.id);

//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }

//       if (post.author.toString() !== req.user._id.toString()) {
//         return res.status(401).json({ message: 'User not authorized' });
//       }

//       post.title = req.body.title || post.title;
//       post.content = req.body.content || post.content;
//       post.photo = req.body.photo || post.photo;

//       await post.save();
//       res.status(200).json({ message: 'Post updated successfully', post });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

// // Fetch a single post
// router.get('/:id', 

//   async (req, res) => {
//     try {
//     //   const post = await Post.findById(req.params.id);
//         const post = await Post.findById(req.params.id).populate('author', 'username name');
//         // const postId = parseInt(req.params.id);
//         // const post = postsData.find(post => post.id === postId);
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }

//       res.status(200).json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });
// //     router.get('/:id', async (req, res) => {
// //         try {
// //         const post = await Post.findById(req.params.id).populate('author', 'username name');
// //         if (!post) {
// //             return res.status(404).json({ message: 'Post not found' });
// //         }
    
// //         res.status(200).json(post);
// //         } catch (err) {
// //         console.error(err.message);
// //         if (err.kind === 'ObjectId') {
// //             return res.status(400).json({ message: 'Invalid post ID' });
// //         }
// //         res.status(500).send('Server Error');
// //         }
// //     });

// module.exports = router;


// //BIG ISSUE IS HOW WE ARE GETTING THE USER ID AND HOW TO IMPLEMENT THE AUTHENTICATION
// //FIGURE OUT HOW TO CONNECT THE USER.JS FILE AND FETCH THE LOGGEDIN USER INFORMATION TO USE AS THE AUTHOR