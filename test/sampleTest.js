const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary
const { expect } = chai;

chai.use(chaiHttp);

describe('Sample Test', () => {
  it('should return 200 on the default route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello world');
        done();
      });
  });
});

