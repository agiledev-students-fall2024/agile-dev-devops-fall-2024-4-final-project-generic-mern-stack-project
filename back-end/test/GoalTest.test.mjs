import { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from "supertest";
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import app from '../app.js';

chaiHttp.use;

describe('Goals API', () => {
  let token; // Variable to store the JWT token

  // Generate a valid JWT token before tests
  before(() => {
    const payload = { userId: 'testUserId', username: 'testuser' }; // Mock user payload
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('GET /goals - Fetch all goals', async () => {
    const res = await request(app)
      .get('/goals')
      .set('Authorization', `Bearer ${token}`); // Add token to Authorization header

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /goals/new - Create a new goal', async () => {
    const newGoal = {
      title: 'New Goal',
      tasks: ['Task 1', 'Task 2'],
      dueDate: '2024-12-31',
    };

    const res = await request(app)
      .post('/goals/new')
      .set('Authorization', `Bearer ${token}`) // Add token to Authorization header
      .send(newGoal);

    expect(res.status).to.equal(201); // 201 for resource creation
    expect(res.body).to.have.property('title', 'New Goal');
    expect(res.body).to.have.property('tasks').that.is.an('array').with.lengthOf(2);
    expect(res.body).to.have.property('dueDate', '2024-12-31T00:00:00.000Z'); // Ensure proper date serialization
  });
});
