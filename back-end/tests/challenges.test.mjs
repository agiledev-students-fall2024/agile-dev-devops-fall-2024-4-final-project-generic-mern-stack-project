import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.mjs';

describe('GET /api/challenges', () => {
  it('should fetch challenges and return a 200 status', async () => {
    const res = await request(app).get('/api/challenges');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.above(0);
  });

  it('should return a 500 status if the API fails', async () => {
    process.env.MOCK_ERROR = 'true';
    const res = await request(app).get('/api/challenges');
    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal('Failed to fetch activity tracker data');
    process.env.MOCK_ERROR = 'false';
  });
});
