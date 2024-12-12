require('dotenv').config();
const { Router } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model("User")
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

const app = new Router();
// IMPORTANT Comment for Sprint3: Up to end of sprint 3, we're not sure whether we need further maintain 
// the Authentication part. For now we will leave the designed login/register logic at here, but we don't integrate 
// it with other parts. You can Register and login as normal, but it WILL NOT AFFECT ANYTHING!!!

const createToken = (id) => {
    const secret = process.env.SECRET
    const token = jwt.sign({id}, secret, {
        expiresIn: 60 * 60 * 24
    })
    return token
}

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    let user
    try {
        user = await User.findOne({username})
    }
    catch(e) {
        res.status(400).json({ message: "Incorrect Username and/or Password" })
        return
    }
    if (user && bcrypt.compareSync(password, user.password_hash)) {
        const token = createToken(user._id)
        res.setHeader("Authorization", `Bearer ${token}`).setHeader('Access-Control-Expose-Headers', 'Authorization')
        res.send(JSON.stringify({"_id": user._id}))
    }
    else {
        res.send(JSON.stringify({error: "Incorrect Username and/or Password"}))
    }
})

app.post("/register", async (req, res) => {
    let { username, password, first_name, last_name } = req.body
    username = sanitize(username)
    password = sanitize(password)
    first_name = sanitize(first_name)
    last_name = sanitize(last_name)
    let check = await User.findOne({username})
    if(check){
        res.status(400).json({ message: "Username already taken" })
        return
    }
    else {
        const name = first_name + " " + last_name
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        const user = new User({ username, password_hash: hash, name });
        const token = createToken(user._id)
        res.setHeader("Authorization", `Bearer ${token}`).setHeader('Access-Control-Expose-Headers', 'Authorization')
        const saved_user = await user.save();
        res.status(200).json({"_id": saved_user._id});
    }
})

module.exports = app;