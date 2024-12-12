import cron from 'node-cron';
import User from '../models/User.js';
 
// Function to update debts
const updateDebts = async () => {
  try {
    const users = await User.find();
 
    users.forEach(async (user) => {
      user.debts.forEach((debt) => {
        const now = new Date();
        let shouldUpdate = false;
 
        switch (debt.paymentSchedule) {
          case 'bi-weekly':
            shouldUpdate = now.getDate() === 1 || now.getDate() === 15;
            break;
          case 'monthly':
            shouldUpdate = now.getDate() === 1;
            break;
          case 'annually':
            shouldUpdate = now.getDate() === 1 && now.getMonth() === 0;
            break;
        }
 
        if (shouldUpdate) {
          debt.ispaidIncurrentPeriod = false;
        }
      });
 
      await user.save();
    });
 
    console.log('Debts updated successfully');
  } catch (error) {
    console.error('Error updating debts:', error);
  }
};
 
// Schedule the cron job to run at midnight on the first day of the interval
cron.schedule('0 0 1 * *', updateDebts); // Monthly and bi-weekly (1st and 15th)
cron.schedule('0 0 15 * *', updateDebts); // Bi-weekly (15th)
cron.schedule('0 0 1 1 *', updateDebts); // Annually (1st January)