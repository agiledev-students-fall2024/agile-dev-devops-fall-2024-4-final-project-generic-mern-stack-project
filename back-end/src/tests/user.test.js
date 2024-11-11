const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary

const { expect } = chai;
chai.use(chaiHttp);

describe('User Profile API', () => {
  describe('POST /api/users/:userId/profile', () => {
    it('should save profile data successfully', (done) => {
      chai
        .request(app)
        .post('/api/users/12345/profile')
        .send({ name: 'John Doe', email: 'johndoe@example.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Profile saved successfully');
          done();
        });
    });

    it('should return error for missing required fields', (done) => {
      chai
        .request(app)
        .post('/api/users/12345/profile')
        .send({ email: 'johndoe@example.com' }) // Missing 'name'
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message', 'Missing required fields: name or email');
          done();
        });
    });
  });

  describe('GET /api/users/:userId/profile', () => {
    it('should retrieve profile data successfully', (done) => {
      chai
        .request(app)
        .get('/api/users/12345/profile')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name', 'John Doe');
          expect(res.body).to.have.property('email', 'johndoe@example.com');
          done();
        });
    });

    it('should return error for profile not found', (done) => {
      chai
        .request(app)
        .get('/api/users/99999/profile') // Non-existent userId
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Profile not found');
          done();
        });
    });
  });
});
