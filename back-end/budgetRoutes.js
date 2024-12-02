// budgetGoalRoutes.js
const express = require('express');
const router = express.Router();
const BudgetGoal = require('./budgetGoal');
const User = require('./user'); // Assuming you have a user model

// POST route to invite a collaborator
router.post('/budget-goals/:goalId/invite', async (req, res) => {
  const { goalId } = req.params;
  const { collaboratorEmail } = req.body;

  try {
    const collaborator = await User.findOne({ email: collaboratorEmail });
    if (!collaborator) return res.status(404).json({ message: 'User not found' });

    const budgetGoal = await BudgetGoal.findById(goalId);
    if (!budgetGoal) return res.status(404).json({ message: 'Budget goal not found' });

    if (!budgetGoal.collaborators.includes(collaborator._id)) {
      budgetGoal.collaborators.push(collaborator._id);
      await budgetGoal.save();
      res.status(200).json({ message: 'Collaborator invited successfully' });
    } else {
      res.status(400).json({ message: 'User is already a collaborator' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
