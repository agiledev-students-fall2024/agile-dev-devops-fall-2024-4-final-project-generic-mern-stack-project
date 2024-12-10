 // it('PUT /tasks/:id/status - should update task status', async function() {
  //   this.timeout(5000); 
  //   const taskId = "1"; 
  //   const res = await request(app)
  //     .put(`/tasks/${taskId}/status`)
  //     .send({ status: 'ongoing' });

  //   expect(res).to.have.status(200);
  //   expect(res.body).to.have.property('status', 'ongoing');
  // });
  // Comment: Since we don't have real database here and taskId is generated randomly every time.
  // So we cannot really do this test because ID will not be found correctly.

  import { use, expect } from 'chai';
  import chaiHttp from 'chai-http';
  import request from 'supertest';
  import jwt from 'jsonwebtoken'; // Import JWT for generating tokens
  import app from '../app.js';
  
  const chai = use(chaiHttp);
  
  describe('Tasks API', () => {
    let token; // Variable to store the JWT token
  
    // Generate a valid JWT token before running tests
    before(() => {
      const payload = { userId: 'testUserId', username: 'testuser' }; // Mock user payload
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    });
  
    it('GET /tasks - Fetch all tasks', async () => {
      const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`); // Add token to Authorization header
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  
    it('GET /tasks/urgent - Fetch urgent tasks for the home page', async () => {
      const res = await request(app)
        .get('/tasks/urgent')
        .set('Authorization', `Bearer ${token}`); // Add token to Authorization header
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.at.most(3);
    });
  
    it('DELETE /tasks/:id - Delete a task', async () => {
      const taskId = '1111'; // Mock task ID
      const res = await request(app)
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`); // Add token to Authorization header
  
      expect(res).to.have.status(204);
    }); // This only validates the HTTP status since task IDs are mocked
  
    it('POST /tasks - Create a new task', async () => {
      const newTask = {
        name: 'Test for Task',
        due: '2024-12-01',
        status: 'not_started',
        priority: 'high',
        subject: 'SDE',
        recurring_period: 'weekly',
      };
  
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`) // Add token to Authorization header
        .send(newTask);
  
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('name', 'Test for Task');
      expect(res.body).to.have.property('due', '2024-12-01T00:00:00.000Z'); // Confirm proper date serialization
      expect(res.body).to.have.property('status', 'not_started');
    });
  });
  