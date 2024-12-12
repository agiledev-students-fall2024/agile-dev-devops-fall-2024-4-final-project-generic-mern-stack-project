import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
  it('should create a new user on /signup POST', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('User registered successfully');
        done();
      });
  });

  it('should not create a user with an existing email on /signup POST', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        username: 'anotheruser',
        email: 'newuser@example.com', // Reuse existing email
        password: 'password123',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('Username or email already in use');
        done();
      });
  });

  it('should retrieve user details on /user/:userId GET', (done) => {
    chai.request(app)
      .get('/user/1') // Mock user ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('email');
        done();
      });
  });

  it('should update user details on /user/:userId POST', (done) => {
    chai.request(app)
      .post('/user/1') // Mock user ID
      .send({
        username: 'updatedUser',
        email: 'updated@example.com',
        profilePicture: 'newPic.jpg',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('User updated successfully');
        done();
      });
  });

  it('should not update user details with invalid user ID on /user/:userId POST', (done) => {
    chai.request(app)
      .post('/user/999') // Invalid user ID
      .send({ username: 'nonexistentUser' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eql('User not found');
        done();
      });
  });
});
