// test/pinRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('Pin Routes', () => {
  
  // 1. Test GET all pins
  describe('/GET all pins', () => {
    it('should GET all pins', (done) => {
      chai.request(app)
        .get('/api/pins')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.above(0);
          done();
        });
    });
  });

  // 2. Test GET pin by ID
  describe('/GET pin by ID', () => {
    it('should GET a pin by ID', (done) => {
      chai.request(app)
        .get('/api/pins/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', 1);
          done();
        });
    });

    it('should return 404 if the pin is not found', (done) => {
      chai.request(app)
        .get('/api/pins/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Pin not found');
          done();
        });
    });
  });


  // 3. Test POST create a new pin
  describe('/POST create a new pin', () => {
    it('should CREATE a new pin', (done) => {
      const newPin = {
        userId: 789,
        message: 'New pin test',
        location: [40.7128, -74.0060]
      };
      chai.request(app)
        .post('/api/pins')
        .send(newPin)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', newPin.message);
          expect(res.body).to.have.property('userId', newPin.userId);
          expect(res.body.location).to.deep.equal(newPin.location);
          done();
        });
    });
  });


    // GET /pins/user/:userId
    describe('/GET pins by user ID', () => {
        it('should retrieve all pins for a specific user', (done) => {
          chai.request(app)
            .get('/api/pins/user/123')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('array');
              res.body.forEach(pin => {
                expect(pin.userId).to.equal(123);
              });
              done();
            });
        });
      
        it('should return 404 if user ID does not exist', (done) => {
          chai.request(app)
            .get('/api/pins/user/999')
            .end((err, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('message', 'User not found');
              done();
            });
        });
      });


    
        // PUT /pins/:id
        describe('/PUT update existing pin by ID', () => {
  it('should update an existing pin by its ID', (done) => {
    const updatedPin = { message: 'Updated message' };
    chai.request(app)
      .put('/api/pins/1')
      .send(updatedPin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(updatedPin.message);
        done();
      });
  });

  it('should return 404 if attempting to update a non-existent pin', (done) => {
    chai.request(app)
      .put('/api/pins/999')
      .send({ message: 'Non-existent pin' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Pin not found');
        done();
      });
  });
});

    // DELETE /pins/:id 
    describe('/DELETE existing pin by ID', () => {
    it('should delete a pin by its ID', (done) => {
        chai.request(app)
          .delete('/api/pins/1')
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
      });
    
      it('should return 404 if attempting to delete a non-existent pin', (done) => {
        chai.request(app)
          .delete('/api/pins/999')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'Pin not found');
            done();
          });
      });
    });


        describe('/GET latest pins', () => {
  it('should fetch the latest N pins', (done) => {
    chai.request(app)
      .get('/api/pins/latest/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').with.lengthOf(2);
        done();
      });
  });

  it('should return 400 if count parameter is invalid', (done) => {
    chai.request(app)
      .get('/api/pins/latest/notanumber')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Count parameter must be a positive number');
        done();
      });
  });

});



});