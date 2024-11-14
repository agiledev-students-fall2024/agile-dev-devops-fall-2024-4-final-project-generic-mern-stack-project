const request = require('supertest');
const app = require('../server');

describe('Server Routes', () => {
    // Auth Routes
    describe('POST /auth/login', () => {
        it('should login successfully with valid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'username', password: 'password' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'User logged in successfully.');
        });

        it('should return 401 for invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'wrong', password: 'wrong' });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid username or password.');
        });
    });

    describe('POST /auth/user', () => {
        it('should create a user successfully', async () => {
            const res = await request(app)
                .post('/auth/user')
                .send({ username: 'newuser', password: 'newpassword' });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'User newuser created successfully.');
        });
    });

    describe('PATCH /auth/user', () => {
        it('should update the password successfully', async () => {
            const res = await request(app)
                .patch('/auth/user')
                .send({ password: 'newpassword' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Password updated successfully.');
        });
    });

    // Meeting Routes
    describe('POST /meeting', () => {
        it('should create a meeting successfully', async () => {
            const res = await request(app).post('/meeting');

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('createdAt');
        });
    });

    describe('GET /meeting/:id', () => {
        let meetingId;

        beforeAll(async () => {
            const res = await request(app).post('/meeting');
            meetingId = res.body.id;
        });

        it('should return a meeting by ID', async () => {
            const res = await request(app).get(`/meeting/${meetingId}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', meetingId);
        });

        it('should return 404 if meeting ID not found', async () => {
            const res = await request(app).get('/meeting/invalid-id');

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Meeting not found');
        });
    });

    describe('POST /meeting/:id/save', () => {
        let meetingId;

        beforeAll(async () => {
            const res = await request(app).post('/meeting');
            meetingId = res.body.id;
        });

        it('should save meeting data successfully', async () => {
            const meetingData = { participants: ['user1', 'user2'] };

            const res = await request(app)
                .post(`/meeting/${meetingId}/save`)
                .send(meetingData);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Meeting saved successfully');
            expect(res.body).toHaveProperty('meeting');
            expect(res.body.meeting).toEqual(meetingData);
        });

        it('should return 404 if meeting ID not found', async () => {
            const res = await request(app)
                .post('/meeting/invalid-id/save')
                .send({});

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Meeting not found');
        });
    });
});
