const express = require('express');
const router = express.Router();

// Mock data for monthly budget recaps
const monthlyRecaps = [
  { month: 'January', budgetLimit: 1000, overallSpent: 800 },
  { month: 'February', budgetLimit: 1200, overallSpent: 1100 },
  { month: 'March', budgetLimit: 900, overallSpent: 850 },
];

// GET route for fetching data for a specific month
router.get('/charts/:month', (req, res) => {
  const { month } = req.params;

  // Find data for the requested month
  const recap = monthlyRecaps.find((r) => r.month.toLowerCase() === month.toLowerCase());
  if (recap) {
    res.status(200).json(recap);
  } else {
    res.status(404).json({ error: `No data found for month: ${month}` });
  }
});

module.exports = router;
