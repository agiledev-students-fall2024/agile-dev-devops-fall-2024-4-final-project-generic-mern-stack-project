const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust path to your app entry file

chai.use(chaiHttp);
const { expect } = chai;

describe('Friends Routes', () => {
  // Test GET all friends for a specific user
  describe('/GET friends by user ID', () => {
    it('should GET all friends for a specific user', (done) => {
      chai.request(app)
        .get('/friends/user/123')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.above(0);
          expect(res.body[0]).to.have.property('name');
          done();
        });
    });
  });

  // Test POST to add a new friend
  describe('/POST add a new friend', () => {
    it('should ADD a new friend for a specific user', (done) => {
      const newFriend = {
        userId: 123,
        name: 'David'
      };
      chai.request(app)
        .post('/friends')
        .send(newFriend)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', newFriend.name);
          expect(res.body).to.have.property('userId', newFriend.userId);
          done();
        });
    });

    it('should return 400 if userId or name is missing', (done) => {
      chai.request(app)
        .post('/friends')
        .send({ userId: 123 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message', 'User ID and friend name are required');
          done();
        });
    });
  });

  // Test DELETE to remove a friend
  describe('/DELETE remove a friend by user ID and name', () => {
    it('should REMOVE a friend by user ID and name', (done) => {
      chai.request(app)
        .delete('/friends/user/123/David')
        .end((err, res) => {
          expect(res).to.have.status(204); // No content
          done();
        });
    });

    it('should return 404 if friend is not found', (done) => {
      chai.request(app)
        .delete('/friends/user/123/NonExistentFriend')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Friend not found');
          done();
        });
    });
  });
});
