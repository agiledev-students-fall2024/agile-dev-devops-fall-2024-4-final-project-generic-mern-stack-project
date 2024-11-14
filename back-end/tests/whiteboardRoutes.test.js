const request = require('supertest');
const app = require('../server');

describe('Whiteboard Routes', () => {
    let server;

    beforeAll(() => {
        // Start server on a test-specific port
        server = app.listen(8081);
    });

    afterAll((done) => {
        server.close(done); // Ensure the server closes after tests
    });

    it('should create a whiteboard id', async () => {
        const res = await request(server)
            .post('/whiteboard')
            .send({ roomId: 'test-room-id' });

        // Replace with actual expected status and response structure
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'marconnect-room-id-knowledge-kitchen-agile-480');
    });

    it('should retrieve a whiteboard id', async () => {
        const res = await request(server)
            .get('/whiteboard')
            .send({ roomId: '123456789' });

        // Replace with actual expected status and response structure
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'marconnect-room-id-knowledge-kitchen-agile-480');
    });

    it('should delete a whiteboard', async () => {
        const res = await request(server)
            .patch('/whiteboard')
            .send({ whiteboardId: 'marconnect-room-id-knowledge-kitchen-agile-480' });

        // Replace with actual expected status and response structure
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'whiteboard deleted');
    });
});
