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
    // try {
    // let newGoal = new Goal({
    //     title,
    //     tasks,
    //     due_date,
    //     completed_tasks: [],
    //     incomplete_tasks: tasks
    // });
    //goes into database
    // newGoal.save();
    //res.json(newGoal);
    //} catch (error) {
    //res.status(400).json({ message: "Error creating goal" });
    //}
    res.json({ message: "Goal created successfully" });
})

module.exports = app;