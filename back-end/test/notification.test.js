import { expect } from 'chai';
import sinon from 'sinon';
import { getNotifications } from '../notifications.js';
import recurringBills from '../mocks/recurringBills.js';

describe('getNotifications', () => {
  let clock;

  beforeEach(() => {
    // Mock date March 10, 2024
    const fixedDate = new Date(2024, 2, 10);
    clock = sinon.useFakeTimers(fixedDate.getTime());

    // Mock recurring bills
    recurringBills.length = 0; 
    recurringBills.push(
      { id: 1, category: 'Electric Bill', dueDate: '15' },       // 5 days away
      { id: 2, category: 'Water Bill', dueDate: '12' },          // 2 days away
      { id: 3, category: 'Subscriptions', dueDate: '10' },    // due today
      { id: 4, category: 'Netflix Subscription', dueDate: '20' } // more than 5 days
    );
  });

  afterEach(() => {
    clock.restore();
  });

  it('should return notifications for bills due within 5 days', () => {
    const notifications = getNotifications();
    console.log('Upcoming Bills:', notifications.upcomingBills);
    
    expect(notifications.upcomingBills).to.be.an('array').with.lengthOf(2);
    expect(notifications.upcomingBills).to.deep.include({ id: 1, category: 'Electric Bill', dueDate: '15', daysUntilDue: 5 });
    expect(notifications.upcomingBills).to.deep.include({ id: 2, category: 'Water Bill', dueDate: '12', daysUntilDue: 2 });
  });

  it('should return notifications for subscriptions due within 5 days', () => {
    const notifications = getNotifications();
    console.log('Subscriptions:', notifications.subscriptions);

    expect(notifications.subscriptions).to.be.an('array').with.lengthOf(1);
    expect(notifications.subscriptions).to.deep.include({ id: 3, category: 'Gym Subscription', dueDate: '10', daysUntilDue: 0 });
  });

  it('should not include bills or subscriptions due beyond 5 days', () => {
    const notifications = getNotifications();
    console.log('All Notifications:', notifications);

    expect(notifications.upcomingBills).to.not.deep.include({ id: 4, category: 'Netflix Subscription', dueDate: '20' });
    expect(notifications.subscriptions).to.be.an('array').with.lengthOf(1);
  });

  it('should return empty arrays if no bills or subscriptions are due within 5 days', () => {
    recurringBills.length = 0; 
    const notifications = getNotifications();

    expect(notifications.upcomingBills).to.be.an('array').that.is.empty;
    expect(notifications.subscriptions).to.be.an('array').that.is.empty;
  });
});
