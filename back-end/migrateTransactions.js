import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // Ensure the correct path to the User model

dotenv.config();

const migrateTransactions = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fetch all users
    const users = await User.find();

    for (const user of users) {
      let hasChanges = false;

      // Loop through transactions and check for missing accountId
      user.transactions.forEach(transaction => {
        if (!transaction.accountId) {
          if (user.accounts && user.accounts.length > 0) {
            // Assign the first account's ID as the default
            transaction.accountId = user.accounts[0]._id;
            hasChanges = true;
          } else {
            console.warn(`User ${user._id} has no accounts to assign to transaction ${transaction._id}`);
          }
        }
      });

      // Save the user if changes were made
      if (hasChanges) {
        await user.save();
        console.log(`Updated user ${user._id} with missing accountId in transactions`);
      }
    }

    console.log('Migration completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error during migration:', error);
    mongoose.connection.close();
  }
};

migrateTransactions();
