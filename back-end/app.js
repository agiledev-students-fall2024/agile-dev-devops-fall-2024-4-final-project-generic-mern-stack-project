// import and instantiate express
require('./config.js')
const task = require("./Task_Routes/task.js")
const goal = require("./Goal_Routes/goal.js")
const cors = require('cors')
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

// we will put some server logic here later...
app.use(
    cors({
        origin: process.env.FRONTEND,
        methods: ["GET", "POST", "DELETE", "PUT"]
    })
)

app.use(express.json());

app.use(task)
app.use(goal)

// export the express app we created to make it available to other modules
module.exports = app