const express = require('express');
const router = express.Router();

// model import
/*
const User = require('../models/User');
const Post = require('../models/Post');
const LoggedIn = require('../models/LoggedIn');
const Friend = require('../models/Friend');
const Blocked = require('../models/Blocked')
*/

const usersData = require('../fillerData/users');
const friendsData = require('../fillerData/friendships');
const blockedData = require('../fillerData/blocked');
const postsData = require('../fillerData/posts');
const loggedInData = require('../fillerData/loggedIn')


// current user
const authUserId = loggedInData[0].id

// Fetch data from MongoDB
/*
const usersData = await User.findOne({ id: authUserId });
const friendsData = await Friend.findOne({ userId: authUserId });
const postsData = await Post.find({ userId: authUserId });
const blockedData = await Blocked.findOne({ userId: authUserId });
const loggedInData = await LoggedIn.findOne({ userId: authUserId });
*/


// route for home
router.get('/', (req, res) => {


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
router.get('/explore', (req, res) => {
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
