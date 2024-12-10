// test/contactRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust path to your app entry file

chai.use(chaiHttp);
const { expect } = chai;

describe('Contact Routes', () => {
  
  // Test GET all contacts
  describe('GET /contacts', () => {
    it('should retrieve all contacts', (done) => {
      chai.request(app)
        .get('/contacts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.above(0);
          done();
        });
    });
  });

  // Test POST create a new contact
  describe('POST /contacts', () => {
    it('should create a new contact', (done) => {
      const newContact = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        message: 'This is a test message',
      };

      chai.request(app)
        .post('/contacts')
        .send(newContact)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Contact saved successfully');
          expect(res.body.contact).to.include(newContact);
          done();
        });
    });

    it('should return 400 if required fields are missing', (done) => {
      chai.request(app)
        .post('/contacts')
        .send({ name: 'Jane Doe' }) // Missing email and message
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  // Test PUT update an existing contact by ID
  describe('PUT /contacts/:id', () => {
    it('should update an existing contact', (done) => {
      const updatedContact = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        message: 'Updated test message',
      };

      chai.request(app)
        .put('/contacts/1') // Assuming contact with ID 1 exists
        .send(updatedContact)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Contact updated successfully');
          expect(res.body.contact).to.include(updatedContact);
          done();
        });
    });

    it('should return 404 if contact ID is not found', (done) => {
      chai.request(app)
        .put('/contacts/999') // Non-existent ID
        .send({
          name: 'Non Existent',
          email: 'nonexistent@example.com',
          message: 'Does not exist',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Contact not found');
          done();
        });
    });
  });
});
