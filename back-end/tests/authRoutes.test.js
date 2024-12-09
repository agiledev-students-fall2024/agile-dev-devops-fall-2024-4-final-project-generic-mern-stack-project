// tests/authRoutes.test.js
const request = require('supertest');
const app = require('../server');

// uuid
const { v4: uuidv4 } = require('uuid');

describe('Auth Routes', () => {
    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'username', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('User logged in successfully.');
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/auth/user')
            .send({ username: `newUser-test-${uuidv4()}`, password: 'newPassword' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User newUser created successfully.');
    });

    // it('should update a user password', async () => {
    //     const res = await request(app)
    //         .patch('/auth/user')
    //         .send({ password: 'updatedPassword' });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.message).toBe('Password updated successfully.');
    // });
});
