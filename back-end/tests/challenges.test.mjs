// import { use, expect } from 'chai'
// import chaiHttp from 'chai-http'
// const chai = use(chaiHttp)

// chai.request()
// import app from '../src/app.mjs';


// describe('GET /api/challenges', () => {
//   it('should fetch challenges and return a 200 status', async () => {
//     const res = await chai.request(app).get('/api/challenges');

//     chai.expect(res.status).to.equal(200); 
//     chai.expect(res.body).to.be.an('array');
//     chai.expect(res.body).to.have.length.above(0);
//   });

//   it('should return a 500 status if the API fails', async () => {
//     const res = await chai.request(app).get('/api/challenges');

//     chai.expect(res.status).to.equal(500);
//     chai.expect(res.body.error).to.equal('Failed to fetch activity tracker data');
//   });
// });
