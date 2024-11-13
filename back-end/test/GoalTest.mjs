import { expect } from 'chai'
import chaiHttp from 'chai-http';
import request from "supertest";
import app from '../app.js';


describe('Goals API', () => {
  it('GET /goals - should fetch all goals', async () => {
    const res = await request(app).get('/goals');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /goals/new - should create a new goal', async () => {
    const newGoal = {
      title: 'New Goal',
      tasks: ['Task 1', 'Task 2'],
      dueDate: '2024-12-31',
    };

    const res = await request(app).post('/goals/new').send(newGoal);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Goal created successfully');
  });
});