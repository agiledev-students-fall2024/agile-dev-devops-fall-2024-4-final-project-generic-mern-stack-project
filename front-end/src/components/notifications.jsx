import React, { useEffect, useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState({
    budgetLimits: [],
    subscriptions: [],
    upcomingBills: []
  });
  const [expandedSections, setExpandedSections] = useState({
    budgetLimits: false,
    subscriptions: false,
    upcomingBills: false
  });

  const userId = localStorage.getItem('id'); 

  useEffect(() => {
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }

    fetch(`http://localhost:3001/api/notifications?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setNotifications({
          budgetLimits: data.budgetLimits || [],
          subscriptions: data.subscriptions || [],
          upcomingBills: data.upcomingBills || []
        });
      })
      .catch((error) => console.error('Failed to fetch notifications:', error));
  }, [userId]);

  const toggleSection = (section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section]
    }));
  };

  return (
    <section className="notifications">
      <h2>Notifications</h2>
      <ul>
        {/* Budget Limits Notifications */}
        <li onClick={() => toggleSection('budgetLimits')}>
          Budget Limits: {notifications.budgetLimits.length} updates
          {expandedSections.budgetLimits && (
            <ul className="expanded-section">
              {notifications.budgetLimits.map((limit, index) => (
                <li key={index} className="expanded-section-item">
                  • {limit.description || limit.name}: ${limit.spent} / ${limit.limit} spent
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Subscriptions Notifications */}
        <li onClick={() => toggleSection('subscriptions')}>
          Subscriptions: {notifications.subscriptions.length} updates
          {expandedSections.subscriptions && (
            <ul className="expanded-section">
              {notifications.subscriptions.map((subscription) => (
                <li key={subscription.id} className="expanded-section-item">
                  {subscription.name} - Due in {subscription.daysUntilDue}{' '}
                  {subscription.daysUntilDue === 1 ? 'day' : 'days'}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Upcoming Bills Notifications */}
        <li onClick={() => toggleSection('upcomingBills')}>
          Upcoming Bills: {notifications.upcomingBills.length} updates
          {expandedSections.upcomingBills && (
            <ul className="expanded-section">
              {notifications.upcomingBills.map((bill) => (
                <li key={bill.id} className="expanded-section-item">
                  {bill.name} - Due in {bill.daysUntilDue}{' '}
                  {bill.daysUntilDue === 1 ? 'day' : 'days'}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </section>
  );
}

export default Notifications;
