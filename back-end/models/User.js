import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
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
          dueDate: { type: Date, required: true },
          paymentSchedule: { type: String, required: true }, 
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
          current: { type: Number, required: true, default: 0 },
          targetAmount: { type: Number, required: true },
        },
      ],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('User', userSchema);
