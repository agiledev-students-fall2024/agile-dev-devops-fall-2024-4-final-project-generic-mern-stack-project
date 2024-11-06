// tests/authRoutes.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'test', password: 'test' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Login route');
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/auth/user')
            .send({ username: 'newUser', password: 'newPassword' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User created');
    });

    it('should update a user password', async () => {
        const res = await request(app)
            .patch('/auth/user')
            .send({ password: 'updatedPassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Password updated');
    });
});
