const { Router } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model("User")

const app = new Router();
// IMPORTANT Comment for Sprint3: Up to end of sprint 3, we're not sure whether we need further maintain 
// the Authentication part. For now we will leave the designed login/register logic at here, but we don't integrate 
// it with other parts. You can Register and login as normal, but it WILL NOT AFFECT ANYTHING!!!
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
        res.send(JSON.stringify(user))
    }
    else {
        res.send(JSON.stringify({error: "Incorrect Username and/or Password"}))
    }
})

app.post("/register", async (req, res) => {
    let { username, password, first_name, last_name } = req.body
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
        const saved_user = await user.save();
        res.status(200).json(saved_user);
    }
})

module.exports = app;