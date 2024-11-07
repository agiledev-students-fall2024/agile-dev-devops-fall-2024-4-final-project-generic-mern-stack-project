const express = require('express');
const router = express.Router();

// get data
const loggedInData = require('../fillerData/loggedIn');
const usersData = require('../fillerData/users');
const friendsData = require('../fillerData/friendships');
const postsData = require('../fillerData/posts');

// current user
const authUserId = loggedInData[0].id

// get friends 
const getFriends = (user_id) => {
  const friends = []

  friendsData.forEach(item => {
      if (item.user_id_1 === user_id) {
          friends.push(item.user_id_2)
      } else if (item.user_id_2 === user_id){
          friends.push(item.user_id_1)
      }
  })

  return friends
} 

// route
router.get('/', (req, res) => {
  const user = usersData.find(user => user.id === authUserId)

  // friends array
  const friends = getFriends(authUserId)

  // posts array
  const posts = postsData.filter(post => friends.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))

  return res.json({posts, user})
})


module.exports = router;
