// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

app.get("/", (req, res) => {
    res.send("Hello World!")
  })

// export the express app we created to make it available to other modules
module.exports = app