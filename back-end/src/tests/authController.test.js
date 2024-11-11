const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path'); // Import Node.js path module

console.log('Resolved path to app.js:', path.resolve(__dirname, '../app'));
const server = require('../app'); // Adjust path if necessary

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller - Signup API', () => {
  it('should sign up a new user successfully', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        name: 'New User'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User registered successfully');
        done();
      });
  });

  it('should return error if email is already registered', (done) => {
    // Attempt to register with an already used email
    chai
      .request(server)
      .post('/api/auth/signup')
      .send({
        email: 'newuser@example.com', // Already used email
        password: 'password123',
        username: 'newuser2',
        name: 'New User 2'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message', 'User already exists');
        done();
      });
  });

  it('should return error for missing email', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send({
        password: 'password123',
        username: 'newuser',
        name: 'New User'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Email is required');
        done();
      });
  });

  it('should return error for weak password', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send({
        email: 'weakpassword@example.com',
        password: '123',
        username: 'weakuser',
        name: 'Weak User'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Password must be at least 6 characters');
        done();
      });
  });
});
