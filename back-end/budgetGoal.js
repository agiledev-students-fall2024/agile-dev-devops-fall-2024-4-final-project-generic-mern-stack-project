// models/BudgetGoal.js
const mongoose = require('mongoose');

const BudgetGoalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('BudgetGoal', BudgetGoalSchema);
