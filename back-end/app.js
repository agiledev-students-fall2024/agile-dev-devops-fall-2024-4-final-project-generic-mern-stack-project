// import and instantiate express
require('./config.js')
const task = require("./Task_Routes/task.js")
const goal = require("./Goal_Routes/goal.js")
const calendarRoutes = require('./Calendar_Routes/calendar.js');
const cors = require('cors')
const auth = require('./Authentication/authentication.js')
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const jwt = require('jsonwebtoken')

// we will put some server logic here later...
app.use(
    cors({
        origin: process.env.FRONTEND,
        methods: ["GET", "POST", "DELETE", "PUT"]
    })
)

app.use(express.json());
app.use(auth)

app.use((req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            jwt.verify(token.split(" ")[1], process.env.SECRET)
            next()
        } catch (error) {
            res.status(401).json({ error: "Invalid token" })
        }
    }
    else {
        res.status(401).json({ error: "No token provided" })
    }

})

app.use(task)
app.use(goal)
app.use(calendarRoutes)
// IMPORTANT Comment for Sprint3: Up to end of sprint 3, we're not sure whether we need further maintain 
// the Authentication part. For now we will leave the designed login/register logic at here, but we don't integrate 
// it with other parts. You can Register and login as normal, but it WILL NOT AFFECT ANYTHING!!!

// export the express app we created to make it available to other modules
module.exports = app