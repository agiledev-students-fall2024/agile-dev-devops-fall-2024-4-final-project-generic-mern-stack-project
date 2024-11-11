import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);


import app from '../app.js'; // Adjust the path based on your project structure

// Test suite for userRoutes
describe('User Routes', () => {
  // Test for fetching user settings
  it('should return 200 and user data for the /user-settings route', (done) => {
    chai.request(app)
      .get('/user-settings')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username'); // Adjust based on actual response structure
        expect(res.body).to.have.property('aboutMe');
        expect(res.body).to.have.property('number');
        done();
      });
  });

  // Test for updating user settings
  it('should return 200 and success message for updating user data', (done) => {
    chai.request(app)
      .put('/user-settings')
      .send({ username: 'UpdatedUser', aboutMe: 'Updated about me', number: '987-654-3210' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User settings updated successfully');
        done();
      });
  });

  // Test for adding a new friend
  it('should return 200 and success message for adding a friend', (done) => {
    chai.request(app)
      .post('/user-settings/add-friend')
      .send({ friendName: 'NewFriend' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Friend added successfully');
        done();
      });
  });

  // Test for removing a friend
  it('should return 200 and success message for removing a friend', (done) => {
    chai.request(app)
      .delete('/user-settings/remove-friend')
      .send({ friendName: 'OldFriend' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Friend removed successfully');
        done();
      });
  });
});










