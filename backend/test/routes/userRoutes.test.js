import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach } from 'mocha';
import '../setup.js';
import app from '../../src/app.js';
import User from '../../src/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const expect = chai.expect;
chai.use(chaiHttp);

describe('User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /user/signup', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'newuser',
        password: 'password123'
      };

      const res = await chai
        .request(app)
        .post('/user/signup')
        .send(userData);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('username', userData.username);

      const user = await User.findOne({ username: userData.username });
      expect(user).to.exist;
    });

    it('should not allow duplicate usernames', async () => {
      const userData = {
        username: 'existinguser',
        password: 'password123'
      };

      await chai.request(app).post('/user/signup').send(userData);
      
      const res = await chai
        .request(app)
        .post('/user/signup')
        .send(userData);

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Username already exists');
    });
  });

  describe('POST /user/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        username: 'testuser',
        password: hashedPassword
      });
    });

    it('should login successfully with correct credentials', async () => {
      const loginData = {
        username: 'testuser',
        password: 'password123'
      };

      const res = await chai
        .request(app)
        .post('/user/login')
        .send(loginData);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('username', loginData.username);
    });

    it('should fail with incorrect password', async () => {
      const loginData = {
        username: 'testuser',
        password: 'wrongpassword'
      };

      const res = await chai
        .request(app)
        .post('/user/login')
        .send(loginData);

      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('Invalid credentials');
    });
  });

  describe('GET /user/verify-token', () => {
    let token;
    let testUser;

    beforeEach(async () => {
      testUser = await User.create({
        username: 'tokenuser',
        password: await bcrypt.hash('password123', 10)
      });
      
      token = jwt.sign(
        { userId: testUser._id, username: testUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    });

    it('should verify valid token', async () => {
      const res = await chai
        .request(app)
        .get('/user/verify-token')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username', testUser.username);
    });

    it('should reject invalid token', async () => {
      const res = await chai
        .request(app)
        .get('/user/verify-token')
        .set('Authorization', 'Bearer invalid_token');

      expect(res).to.have.status(401);
    });
  });
});