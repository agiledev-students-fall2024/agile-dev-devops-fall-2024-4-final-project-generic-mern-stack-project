const { Router } = require('express');
const mongoose = require('mongoose');

const app = new Router();

app.get("/goals", async (req, res) => {
    let response = await fetch('https://my.api.mockaroo.com/goal?key=34c59640');
    response = await response.json();
    console.log(response)
    res.json(response)
})

app.post("/goals/new", async (req, res) => {
    let { title, tasks, dueDate } = req.body;
    console.log(req.body);
    res.json({ message: "Goal created successfully" });
})

module.exports = app;