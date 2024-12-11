import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
 
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePicture: String,
  password: { type: String, required: true },
 
  accounts: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
      number: { type: String, required: true },
    },
  ],
  debts: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
      paidAmount: { type: Number, required: true },
      dueDate: { type: Date, required: true },
      paymentSchedule: { type: String, required: true }, //bi-weekly, monthly, annually
      ispaidIncurrentPeriod: { type: Boolean, required: true },
      accountId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Refers to the _id of an embedded account
    },
  ],
  transactions: [
    {
      merchant: { type: String, required: true },
      category: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
    },
  ],
  goals: [
    {
      name: { type: String, required: true },
      currentAmount: { type: Number, default: 0, min: 0 },
      frequency: {
        type: String,
        enum: ['daily', 'monthly', 'annual'],
        required: true,
      },
      targetAmount: { type: Number, required: true },
      collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
  ],
  budgetLimits: {
    monthlyLimit: { type: Number, required: true, default: 0 }, // Overall monthly budget limit
    categories: [
      {
        name: { type: String, required: true }, // User-defined category name
        limit: { type: Number, required: true, default: 0 }, // User-defined budget limit for the category
      },
    ],
    other: { type: Number, default: 0 }, // Automatically calculated as excess from unallocated funds
  },
});
 
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
 
export default mongoose.model('User', userSchema);