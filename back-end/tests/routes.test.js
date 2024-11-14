const request = require('supertest');
const express = require('express');
const meetingRoutes = require('../routes/join-create-meeting');

// Create test app
const app = express();
app.use(express.json());
app.use('/meeting', meetingRoutes);

describe('Meeting Routes', () => {
    beforeEach(() => {
        // Clear the meetings Map before each test
        const meetings = new Map();
    });

    describe('POST /meeting', () => {
        it('should create a new meeting with correct format', async () => {
            const response = await request(app)
                .post('/meeting')
                .expect('Content-Type', /json/)
                .expect(201);

            // Check response structure
            expect(response.body).toEqual({
                id: expect.any(String),
                createdAt: expect.any(String),
                participants: expect.any(Array),
                settings: {
                    allowChat: true,
                    allowCodeEditor: true,
                    allowWhiteboard: true,
                    allowScreenShare: true
                }
            });

            // Check specific properties
            expect(response.body.id).toHaveLength(9); // 9-digit ID
            expect(response.body.participants).toHaveLength(0); // Empty participants array
            expect(new Date(response.body.createdAt)).toBeInstanceOf(Date); // Valid date
        });

        it('should create unique meeting IDs for multiple meetings', async () => {
            const response1 = await request(app).post('/meeting');
            const response2 = await request(app).post('/meeting');

            expect(response1.body.id).not.toBe(response2.body.id);
        });
    });

    describe('GET /meeting/:id', () => {
        let createdMeeting;

        beforeEach(async () => {
            // Create a meeting to test with
            const response = await request(app).post('/meeting');
            createdMeeting = response.body;
        });

        it('should return meeting details for valid ID', async () => {
            const response = await request(app)
                .get(`/meeting/${createdMeeting.id}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(createdMeeting);
        });

        it('should return 404 for non-existent meeting ID', async () => {
            const response = await request(app)
                .get('/meeting/999999999')
                .expect('Content-Type', /json/)
                .expect(404);

            expect(response.body).toEqual({
                error: 'Meeting not found'
            });
        });

        it('should return correct meeting settings', async () => {
            const response = await request(app)
                .get(`/meeting/${createdMeeting.id}`);

            expect(response.body.settings).toEqual({
                allowChat: true,
                allowCodeEditor: true,
                allowWhiteboard: true,
                allowScreenShare: true
            });
        });
    });
});