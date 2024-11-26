const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent'); 

// GET /calendar/month/:year/:month - Fetch events for a specific month
// router.get('/calendar/month/:year/:month', async (req, res) => {
//   const { year, month } = req.params;

//   try {testtesttesttest
//     const events = await CalendarEvent.find({
//       date: {
//         $gte: new Date(year, month - 1, 1),
//         $lt: new Date(year, month, 1)
//       }
//     });
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching monthly events", error });
//   }
// });

// // GET /calendar/day/:date - Fetch events for a specific day
// router.get('/calendar/day/:date', async (req, res) => {
//   const { date } = req.params;

//   try {
//     const events = await CalendarEvent.find({
//       date: {
//         $eq: new Date(date)
//       }
//     });
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching daily events", error });
//   }
// });

// // POST /calendar/event - Create a new event
// router.post('/calendar/event', async (req, res) => {
//   const { title, date, description } = req.body;

//   if (!title || !date) {
//     return res.status(400).json({ message: "Title and date are required" });
//   }

//   try {
//     const newEvent = new CalendarEvent({ title, date, description });
//     const savedEvent = await newEvent.save();
//     res.status(201).json(savedEvent);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating event", error });
//   }
// });

// // PUT /calendar/event/:id - Update an existing event
// router.put('/calendar/event/:id', async (req, res) => {
//   try {
//     const updatedEvent = await CalendarEvent.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(updatedEvent);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating event", error });
//   }
// });

// // DELETE /calendar/event/:id - Delete an event by ID
// router.delete('/calendar/event/:id', async (req, res) => {
//   try {
//     await CalendarEvent.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting event", error });
//   }
// });





// GET /calendar/month/:year/:month/tasks - Fetch task counts for each day of a specific month
router.get('/calendar/month/:year/:month/tasks', async (req, res) => {
  const { year, month } = req.params;
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0); // Last day of the month


  const daysInMonth = new Date(year, month, 0).getDate();
  const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    count: Math.floor(Math.random() * 5) // Random count between 0 and 4
  }));

  res.json(dailyTaskCounts);

  // try {
  //   // Fetch tasks from the /tasks endpoint
  //   let response = await fetch('http://localhost:4000/tasks');
  //   let tasks = await response.json();

    // Parse the date and filter tasks for the requested month and year
  //   const tasksInMonth = tasks.filter(task => {
  //     const taskDate = new Date(task.due);
  //     return taskDate.getFullYear() === parseInt(year) &&
  //            taskDate.getMonth() === parseInt(month) - 1;
  //   });

  //   // Count tasks by day
  //   const taskCounts = {};
  //   tasksInMonth.forEach(task => {
  //     const day = new Date(task.due).getDate();
  //     taskCounts[day] = (taskCounts[day] || 0) + 1;
  //   });

  //   // Populate task counts for each day of the month
  //   const daysInMonth = new Date(year, month, 0).getDate();
  //   const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => ({
  //     day: i + 1,
  //     count: taskCounts[i + 1] || 0
  //   }));

  //   res.json(dailyTaskCounts);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching monthly task counts", error });
  // }


  // _______ the following is for database is done_______
  // try {
  //   // Fetch tasks within the month
  //   // From the database!
  //   const tasks = await CalendarEvent.find({
  //     date: {
  //       $gte: startOfMonth,
  //       $lte: endOfMonth
  //     }
  //   });

  //   // Count tasks by day
  //   const taskCounts = {};
  //   tasks.forEach(task => {
  //     const day = new Date(task.date).getDate();
  //     taskCounts[day] = (taskCounts[day] || 0) + 1;
  //   });

  //   // Populate task counts for each day of the month (days without tasks will have a count of 0)
  //   const daysInMonth = new Date(year, month, 0).getDate();
  //   const dailyTaskCounts = Array.from({ length: daysInMonth }, (_, i) => ({
  //     day: i + 1,
  //     count: taskCounts[i + 1] || 0
  //   }));

  //   res.json(dailyTaskCounts);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching monthly task counts", error });
  // }
});




router.get('/calendar/:month/:day/:year', async (req, res) => {
  let { month, day, year } = req.params;
  //just call all tasks for now because we don't have a database and cant
  //consistantly save data with specific dates on mockaroo
  let data = await fetch("https://my.api.mockaroo.com/tasks?key=34c59640");
  data = await data.json();
  res.send(data);
})

module.exports = router;
