import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';

chai.use(chaiHttp); // Register chaiHttp as a plugin for chai

describe('Goals API', () => {
    // Generate a valid JWT for testing
    const token = jwt.sign({ userId: 'mockUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    it('GET /goals - Fetch all goals', async () => {
        const res = await request(app)
            .get('/goals')
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('POST /goals/new - Create a new goal', async () => {
        const newGoal = {
            title: 'New Goal',
            tasks: ['mockTaskId1', 'mockTaskId2'], // Replace with actual or mock task IDs
            dueDate: '2024-12-31',
        };

        const res = await request(app)
            .post('/goals/new')
            .set('Authorization', `Bearer ${token}`) // Add JWT token
            .send(newGoal);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('title', 'New Goal');
        expect(res.body).to.have.property('tasks').that.is.an('array');
        expect(res.body).to.have.property('dueDate');
    });
});
