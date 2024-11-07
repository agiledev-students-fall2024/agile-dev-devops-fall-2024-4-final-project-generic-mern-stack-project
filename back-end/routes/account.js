const express = require('express');
const router = express.Router();
const loggedInData = require('../fillerData/loggedIn');
const usersData = require('../fillerData/users');
const blockedData = require('../fillerData/blocked');
const friendsData = require('../fillerData/friendships');
const postsData = require('../fillerData/posts');


const authUserId = loggedInData[0].id

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

router.get('/authUser', (req, res) => {
    user = usersData.find(user => user.id === authUserId)
    if (user){
        return res.json(user)
    } 
    return res.json(null)
})

router.post('/edit', (req, res) => {
    const { name, bio, layout, profileImg } = req.body
    const user = usersData.find(user => user.id === authUserId)

    if (user) {
        user.name = name;
        user.bio = bio;
        user.layout = layout;

        return res.status(200).json({ message: 'Your profile was successfully updated!', username: user.username });
    }

    return res.status(404).json({ error: 'User not found' });
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersData.find(user => user.username === username && user.password === password);

    if (user) {
        return res.status(200).json({ message: 'Login successful!' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
})

router.post('/register', (req, res) => {
    const { name, username, email, password, confirm } = req.body;
    const user = usersData.find(user => user.username === username || user.email === email)

    if (user){
        return res.status(401).json({ message: 'Username or email already exists.' });
    }
    
    if (password !== confirm){
        return res.status(401).json({ message: 'Passwords must match.' });
    }

    usersData.push({
        'id': 7,
        'username': username,
        'password': password,
        'email': email,
        'name': name,
        'bio': '',
        'createdAt': '2023-01-01T12:00:00Z',
        'updatedAt': '2023-10-01T12:00:00Z',
        'profilePicture': '',
        'layout':'list'
    })

    return res.status(200).json({ message: 'Registration successful!' });
})

router.get('/user/:username', (req, res) => {
    const username = req.params.username
    const user = usersData.find(user => user.username === username)
    if (!user){
        return res.status(404).json({ error: 'User not found' })
    } 

    const blockedUsers = getBlockedUsers(authUserId)
    if (blockedUsers.includes(user.id)){
        return res.status(404).json({ error: 'User not found' })
    } 

    const posts = postsData.filter(post => post.author_id === user.id).sort((a, b) => new Date(b.date) - new Date(a.date))

    let friends = false
    if (user.id !== authUserId){
        friends = getFriends(authUserId).includes(user.id)
    } 

    return res.json({ belongsToLoggedIn: authUserId === user.id, user, posts, friends: friends })
})

module.exports = router;
