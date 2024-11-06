(async () => {
  const chai = await import('chai');
  const chaiHttp = await import('chai-http');
  const app = require('../app'); // Keep `app` as CommonJS if it's already set up that way
  const { expect } = chai.default; // Access chai through `default`

  chai.default.use(chaiHttp.default);

  describe('Sample Test', () => {
    it('should return 200 on the default route', (done) => {
      chai.default.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello world');
          done();
        });
    });
  });
})();










