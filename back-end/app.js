// import and instantiate express
require('./config.js')
const task = require("./Task_Routes/task.js")
const goal = require("./Goal_Routes/goal.js")
const calendarRoutes = require('./Calendar_Routes/calendar.js');
const cors = require('cors')
const auth = require('./Authentication/authentication.js')
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

// we will put some server logic here later...
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "DELETE", "PUT"]
    })
)

app.use(express.json());

app.use(task)
app.use(goal)
app.use(calendarRoutes);
// IMPORTANT Comment for Sprint3: Up to end of sprint 3, we're not sure whether we need further maintain 
// the Authentication part. For now we will leave the designed login/register logic at here, but we don't integrate 
// it with other parts. You can Register and login as normal, but it WILL NOT AFFECT ANYTHING!!!
app.use(auth)

// export the express app we created to make it available to other modules
module.exports = app