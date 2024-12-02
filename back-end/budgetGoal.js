import mongoose from 'mongoose';

const BudgetGoalSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  currentAmount: Number,
  ownerId: mongoose.Schema.Types.ObjectId,
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of collaborator IDs
});

export default mongoose.model('BudgetGoal', BudgetGoalSchema);
