import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';

chai.use(chaiHttp); // Register chaiHttp as a plugin for chai

describe('Tasks API', () => {
    // Generate a valid JWT for testing
    const token = jwt.sign({ userId: 'mockUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    it('GET /tasks - Fetch all tasks', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET /tasks/urgent - Fetch urgent tasks for the home page', async () => {
        const res = await request(app)
            .get('/tasks/urgent')
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.most(3);
    });

    it('DELETE /tasks/:id - Delete a task', async () => {
        const mockTaskId = 'mockTaskId'; // Replace with an actual or mock task ID
        const res = await request(app)
            .delete(`/tasks/${mockTaskId}`)
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(204); // No content for successful deletion
    });

    it('POST /tasks - Create a new task', async () => {
        const newTask = {
            name: 'Test Task',
            due: '2024-12-01',
            status: 'not_started',
            priority: 'high',
            subject: 'Testing',
            recurring_period: 'Weekly',
        };

        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`) // Add JWT token
            .send(newTask);

        expect(res.status).to.equal(201); // Task successfully created
        expect(res.body).to.have.property('name', 'Test Task');
    });
});
