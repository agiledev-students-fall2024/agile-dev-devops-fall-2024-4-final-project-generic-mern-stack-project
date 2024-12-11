const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import your app using CommonJS

chai.use(chaiHttp);
const { expect } = chai;

// Tests
describe('Form Routes', () => {
  describe('/GET contacts', () => {
    it('should GET all contacts', (done) => {
      chai.request(app)
        .get('/contact')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('/POST contacts', () => {
    it('should POST a new contact', (done) => {
      const contact = {
        name: 'Test User',
        email: 'testuser@example.com',
        message: 'This is a test message.'
      };
      chai.request(app)
        .post('/contact')
        .send(contact)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.contact).to.have.property('name', contact.name);
          done();
        });
    });
  });

  describe('/GET feedback', () => {
    it('should GET all feedback', (done) => {
      chai.request(app)
        .get('/feedback')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('/POST feedback', () => {
    it('should POST a new feedback', (done) => {
      const feedback = {
        answer1: 'Test answer 1',
        answer2: 'Test answer 2',
        answer3: 'Test answer 3'
      };
      chai.request(app)
        .post('/feedback')
        .send(feedback)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.feedback).to.have.property('answer1', feedback.answer1);
          done();
        });
    });
  });
});
