const express = require('express');
const router = express.Router();
const loggedInData = require('../fillerData/loggedIn');
const usersData = require('../fillerData/users');
const blockedData = require('../fillerData/blocked');
const postsData = require('../fillerData/posts');

const loggedInUserId = loggedInData[0].id

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

router.get('/user/:username', (req, res) => {
    const username = req.params.username

    const user = usersData.find(user => user.username === username)
    if (!user){
        return res.status(404).json({ error: 'User not found' })
    } 

    const blockedUsers = getBlockedUsers(loggedInUserId)
    if (blockedUsers.includes(user.id)){
        return res.status(404).json({ error: 'User not found' })
    } 

    const posts = postsData.filter(post => post.author_id === user.id).sort((a, b) => new Date(b.date) - new Date(a.date))
    return res.json({ belongsToLoggedIn: loggedInUserId === user.id, user, posts })
});


router.get('/loggedIn', (req, res) => {
    res.json(usersData.find(user => user.id === loggedInUserId)); 
});

module.exports = router;
