import mongoose from 'mongoose';
 
const RecurringPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Refers to the _id of an embedded account
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Number, required: true }, // Day of the month
});
 
export default mongoose.model('RecurringPayment', RecurringPaymentSchema);
 