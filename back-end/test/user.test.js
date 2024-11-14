import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import User from '../user.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
  let userId;

  before(async () => {
    // Create a user to test with
    const user = new User({ username: 'existinguser', email: 'existing@example.com', password: 'password123' });
    const savedUser = await user.save();
    userId = savedUser._id;
  });

  after(async () => {
    await User.deleteMany({});
  });

  it('should create a new user on /signup POST', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('User registered successfully');
        done();
      });
  });

  it('should retrieve user details on /user/:userId GET', (done) => {
    chai.request(app)
      .get(`/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username').eql('existinguser');
        expect(res.body).to.not.have.property('password'); // Ensure password is not returned
        done();
      });
  });

  it('should update user details on /user/:userId POST', (done) => {
    chai.request(app)
      .post(`/user/${userId}`)
      .send({ username: 'updatedUser' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('User updated successfully');
        done();
      });
  });
});
