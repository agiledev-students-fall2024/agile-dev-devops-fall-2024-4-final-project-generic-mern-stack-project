const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Friendship = require('../models/Friendship');
const Blocked = require('../models/Blocked');
const Post = require('../models/Post');

// Middleware to authenticate using JWT
router.use(passport.authenticate('jwt', { session: false }));

// Error handler for authentication
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
  next(err);
});

// Route for home
router.get('/', async (req, res) => {
  try {
    const authUserId = req.user.id; // Use Passport's user data

    // Fetch the authenticated user
    const user = await User.findById(authUserId);
    if (!authUserId || !user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Get friends of the user
    const friendships = await Friendship.find({
      $or: [{ user1: authUserId }, { user2: authUserId }],
    });
    const friendIds = friendships.map(f =>
      f.user1.toString() === authUserId ? f.user2 : f.user1
    );

    // Fetch posts by friends, sorted by date
    const posts = await Post.find({ author: { $in: friendIds } })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ posts, user });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for explore
router.get('/explore', async (req, res) => {
  try {
    const authUserId = req.user.id;

    // Fetch the authenticated user
    const user = await User.findById(authUserId);
    if (!authUserId || !user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Get blocked users
    const blocked = await Blocked.find({
      $or: [{ blocked: authUserId }, { blocker: authUserId }],
    });
    const blockedIds = blocked.map(b =>
      b.blocked.toString() === authUserId ? b.blocker : b.blocked
    );

    // Fetch posts excluding the user's own and blocked users, sorted by date
    const posts = await Post.find({
      author: { $ne: authUserId, $nin: blockedIds },
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ posts, user });
  } catch (error) {
    console.error('Error fetching explore posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;





/*
const express = require('express');
const router = express.Router();

const passport = require('passport')
const usersData = require('../fillerData/users');
const friendsData = require('../fillerData/friendships');
const blockedData = require('../fillerData/blocked');
const postsData = require('../fillerData/posts');
const loggedInData = require('../fillerData/loggedIn')


// current user
const authUserId = loggedInData[0].id


// route for home
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {


  const user = usersData.find(user => user.id === authUserId)

  // if not logged in, user cannot view home page blog posts
  if (!user){
    return res.status(401).json({message: 'Unauthorized: User not found'})
  }

  // array of friendship data
  const friends = friendsData
  .filter(item => item.user_id_1 === authUserId || item.user_id_2 === authUserId)  
  .map(item => item.user_id_1 === authUserId ? item.user_id_2 : item.user_id_1);

  // posts array
  const posts = postsData.filter(post => friends.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))

  return res.status(200).json({posts, user})
})

// route for explore
router.get('/explore', passport.authenticate('jwt', {session: false}), async  (req, res) => {
  const user = usersData.find(user => user.id === authUserId)

  // if not logged in, user cannot view home page blog posts
  if (!user){
    return res.status(401).json({message: 'Unauthorized: User not found'})
  }

  // blocked list of users
  const blockedUsers =blockedData
  .filter(item => item.blocked_id === authUserId || item.blocker_id === authUserId)
  .map(item => item.blocked_id === authUserId ? item.blocker_id : item.blocked_id)

  // posts array does not include loggedin user's own posts
  const posts = postsData
    .filter(post => post.author_id !== authUserId && !blockedUsers.includes(post.author_id))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return res.status(200).json({posts, user})
})


module.exports = router;
*/




/*

React.useEffect(() => {
  axios
    .get(`${apiUrl}/api/account/user/${username}`,
      {headers: {Authorization: `Bearer ${token}`}}
    )})
*/