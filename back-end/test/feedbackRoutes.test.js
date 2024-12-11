// test/feedbackRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust path to your app entry file

chai.use(chaiHttp);
const { expect } = chai;

describe('Feedback Routes', () => {
  
  // Test GET all feedback
  describe('GET /feedback', () => {
    it('should retrieve all feedback', (done) => {
      chai.request(app)
        .get('/feedback')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.above(0);
          done();
        });
    });
  });

  // Test POST create new feedback
  describe('POST /feedback', () => {
    it('should create new feedback', (done) => {
      const newFeedback = {
        answer1: 'Great service',
        answer2: 'Quick response time',
        answer3: 'Will recommend to others',
      };

      chai.request(app)
        .post('/feedback')
        .send(newFeedback)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Feedback saved successfully');
          expect(res.body.feedback).to.include(newFeedback);
          done();
        });
    });

    it('should return 400 if required fields are missing', (done) => {
      chai.request(app)
        .post('/feedback')
        .send({ answer1: 'Great service' }) // Missing answer2 and answer3
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  // Test PUT update feedback by ID
  describe('PUT /feedback/:id', () => {
    it('should update feedback by ID', (done) => {
      const updatedFeedback = {
        answer1: 'Updated service feedback',
        answer2: 'Faster response time',
        answer3: 'Highly recommended',
      };

      chai.request(app)
        .put('/feedback/1') // Assuming feedback with ID 1 exists
        .send(updatedFeedback)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Feedback updated successfully');
          expect(res.body.feedback).to.include(updatedFeedback);
          done();
        });
    });

    it('should return 404 if feedback ID is not found', (done) => {
      chai.request(app)
        .put('/feedback/999') // Non-existent ID
        .send({
          answer1: 'Updated service feedback',
          answer2: 'Faster response time',
          answer3: 'Highly recommended',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Feedback not found');
          done();
        });
    });
  });
});
