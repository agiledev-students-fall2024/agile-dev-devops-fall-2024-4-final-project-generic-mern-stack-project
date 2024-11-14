const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path'); // Import Node.js path module

console.log('Resolved path to app.js:', path.resolve(__dirname, '../app'));
const server = require('../app'); // Adjust path if necessary

chai.use(chaiHttp);
const { expect } = chai;

describe('User Profile API', () => {
  it('should save profile data successfully', (done) => {
    chai
      .request(server)
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
      .request(server)
      .post('/api/users/12345/profile')
      .send({ name: 'John Doe' }) // Missing email
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Missing required fields: name or email');
        done();
      });
  });

  it('should retrieve profile data successfully', (done) => {
    chai
      .request(server)
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
      .request(server)
      .get('/api/users/99999/profile') // Non-existent user
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Profile not found');
        done();
      });
  });
});
