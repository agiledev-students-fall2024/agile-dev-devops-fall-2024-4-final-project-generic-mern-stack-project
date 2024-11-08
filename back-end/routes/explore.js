const express = require('express');
const router = express.Router();

// get data
const loggedInData = require('../fillerData/loggedIn');
const usersData = require('../fillerData/users');
const postsData = require('../fillerData/posts');
const blockedData = require('../fillerData/blocked');

// current user
const authUserId = loggedInData[0].id

// get blocked lists
const getBlockedUsers = (user_id) => {
  const blockedUsers = []

  blockedData.forEach(item => {
      if (item.blocked_id === user_id) {
          blockedUsers.push(item.blocker_id)
      } else if (item.blocker_id === user_id){
          blockedUsers.push(item.blocked_id)
      }
  })

  return blockedUsers
}

// route
router.get('/', (req, res) => {
  const user = usersData.find(user => user.id === authUserId)

  // blocked users
  const blocked = getBlockedUsers(authUserId)

  // excludes user's own posts
  blocked.push(user.id)

  // posts array
  const posts = postsData.filter(post => !blocked.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))

  return res.json({posts, user})
})


module.exports = router;
