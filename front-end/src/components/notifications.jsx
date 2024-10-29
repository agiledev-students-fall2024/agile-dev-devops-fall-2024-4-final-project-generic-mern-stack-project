import React from 'react';
import recurringBills from '../mocks/recurringBills';

function Notifications() {
  const today = new Date();
  const currentDay = today.getDate();

  const calculateDaysUntilDue = (dueDay) => {
    let daysUntilDue = dueDay - currentDay;
    if (daysUntilDue < 0) {
      daysUntilDue += 30; 
    }
    return daysUntilDue;
  };

  const upcomingBills = recurringBills
    .map((bill) => {
      const dueDay = parseInt(bill.dueDate, 10); 
      const daysUntilDue = calculateDaysUntilDue(dueDay);
      return { ...bill, daysUntilDue };
    })
    .filter((bill) => bill.daysUntilDue > 0 && bill.daysUntilDue <= 5);

  return (
    <section className="notifications">
      <h2>Notifications</h2>
      <ul>
        {upcomingBills.length > 0 ? (
          upcomingBills.map((bill) => (
            <li key={bill.id}>
              💡 Upcoming {bill.category}: {bill.name} - Due in {bill.daysUntilDue} days
            </li>
          ))
        ) : (
          <li>No upcoming bills or subscriptions within the next 5 days.</li>
        )}
      </ul>
    </section>
  );
}

export default Notifications;
