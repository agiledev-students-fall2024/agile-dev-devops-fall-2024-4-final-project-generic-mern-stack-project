// test/authRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const path = require('path');

const authRoutes = require(path.join(__dirname, '../routes/authroutes'));

chai.use(chaiHttp);
const { expect } = chai;

// Set up an Express app instance for testing
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  
  // Additional login route tests
  describe('POST /auth/login', () => {
    it('should login successfully with correct credentials', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ username: 'user1', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Login successful');
          done();
        });
    });

    it('should fail login with incorrect credentials', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ username: 'user1', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error', 'Invalid username or password');
          done();
        });
    });

    it('should fail login with a missing username', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ password: 'password123' }) // Missing username
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Username is required');
          done();
        });
    });

    it('should fail login with a missing password', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ username: 'user1' }) // Missing password
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Password is required');
          done();
        });
    });
  });

  // Additional register route tests
  describe('POST /auth/register', () => {
    it('should register successfully with valid data', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword', confirmPassword: 'newpassword' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Registration successful');
          expect(res.body).to.have.property('userId');
          done();
        });
    });

    it('should fail registration when passwords do not match', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'anotheruser', email: 'anotheruser@example.com', password: 'newpassword', confirmPassword: 'differentpassword' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Passwords do not match');
          done();
        });
    });

    it('should fail registration when username or email already exists', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'user1', email: 'user1@example.com', password: 'password123', confirmPassword: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Username or email already exists');
          done();
        });
    });

    it('should fail registration with a missing username', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ email: 'user@example.com', password: 'password123', confirmPassword: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Username is required');
          done();
        });
    });

    it('should fail registration with a missing email', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'user3', password: 'password123', confirmPassword: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Email is required');
          done();
        });
    });

    it('should fail registration with a missing password', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'user4', email: 'user4@example.com', confirmPassword: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Password is required');
          done();
        });
    });

    it('should fail registration with a missing confirm password', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ username: 'user5', email: 'user5@example.com', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Confirm password is required');
          done();
        });
    });
  });
});
