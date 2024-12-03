// test/userRoutes.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app.js'); // Adjusted path for clarity
const User = require('../src/models/User.js'); // Adjusted path for clarity
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
  let mongoServer;

  before(async () => {
    // Start in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Close connection and stop MongoDB instance
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear database before each test
    await User.deleteMany({});
  });

  describe('POST /user/signup', () => {
    it('should create a new user and return a token', async () => {
      const res = await chai
        .request(app)
        .post('/user/signup')
        .send({ username: 'testuser', password: 'password123' });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('username', 'testuser');
    });

    it('should not create a user with an existing username', async () => {
      await new User({ username: 'testuser', password: 'password123' }).save();

      const res = await chai
        .request(app)
        .post('/user/signup')
        .send({ username: 'testuser', password: 'newpassword' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Username already exists');
    });
  });

  describe('POST /user/login', () => {
    it('should log in an existing user and return a token', async () => {
      await new User({ username: 'testuser', password: 'password123' }).save();

      const res = await chai
        .request(app)
        .post('/user/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('username', 'testuser');
    });

    it('should not log in with incorrect credentials', async () => {
      const res = await chai
        .request(app)
        .post('/user/login')
        .send({ username: 'nonexistent', password: 'wrongpassword' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Invalid credentials');
    });
  });
});
