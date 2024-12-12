const request = require('supertest');
const express = require('express');
const router = require('../routes/code');
const codeService = require('../services/codeService');
const { collection, onSnapshot } = require('firebase/firestore');

// Mock Firestore
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    onSnapshot: jest.fn(),
}));

// Mock Code Service
jest.mock('../services/codeService', () => ({
    getCodeHistory: jest.fn(),
    sendCodeUpdate: jest.fn(),
    db: {}, // Mock Firestore instance
}));

describe('Code Routes', () => {
    const app = express();
    app.use(express.json());
    app.use('/', router);

    describe('GET /:meetingId', () => {
        it('should return code history for a meeting', async () => {
            const mockHistory = [{ code: 'console.log("Hello");', language: 'javascript' }];
            codeService.getCodeHistory.mockResolvedValue(mockHistory);

            const res = await request(app).get('/12345');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockHistory);
            expect(codeService.getCodeHistory).toHaveBeenCalledWith('12345');
        });

        it('should handle errors when getting code history', async () => {
            codeService.getCodeHistory.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/12345');
            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to get code history' });
            expect(codeService.getCodeHistory).toHaveBeenCalledWith('12345');
        });
    });

    describe('POST /:meetingId', () => {
        it('should send a code update successfully', async () => {
            codeService.sendCodeUpdate.mockResolvedValue(true);

            const payload = { code: 'console.log("Hello");', language: 'javascript' };
            const res = await request(app).post('/12345').send(payload);

            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual({ message: 'Code update sent successfully' });
            expect(codeService.sendCodeUpdate).toHaveBeenCalledWith(
                '12345',
                payload.code,
                payload.language,
                expect.any(Number) // Timestamp
            );
        });

        it('should handle errors when sending a code update', async () => {
            codeService.sendCodeUpdate.mockResolvedValue(false);

            const payload = { code: 'console.log("Hello");', language: 'javascript' };
            const res = await request(app).post('/12345').send(payload);

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to send code update' });
            expect(codeService.sendCodeUpdate).toHaveBeenCalledWith(
                '12345',
                payload.code,
                payload.language,
                expect.any(Number)
            );
        });

        it('should handle exceptions when sending a code update', async () => {
            codeService.sendCodeUpdate.mockRejectedValue(new Error('Unexpected error'));

            const payload = { code: 'console.log("Hello");', language: 'javascript' };
            const res = await request(app).post('/12345').send(payload);

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to send code update' });
            expect(codeService.sendCodeUpdate).toHaveBeenCalledWith(
                '12345',
                payload.code,
                payload.language,
                expect.any(Number)
            );
        });
    });

    describe('GET /:meetingId/stream', () => {
        let mockWrite, mockEnd;

        beforeEach(() => {
            mockWrite = jest.fn();
            mockEnd = jest.fn();
        });

        it('should set up an SSE stream and send updates', async () => {
            const req = { params: { meetingId: '12345' }, on: jest.fn() };
            const res = {
                writeHead: jest.fn(),
                write: mockWrite,
                end: mockEnd,
            };

            const snapshotMock = {
                docChanges: jest.fn(() => [
                    {
                        type: 'added',
                        doc: { data: () => ({ code: 'console.log("Hello");' }) },
                    },
                ]),
            };

            const unsubscribeMock = jest.fn();
            onSnapshot.mockImplementation((_, onSuccess) => {
                onSuccess(snapshotMock);
                return unsubscribeMock;
            });

            const next = jest.fn();
            await router.handle(req, res, next);

            expect(res.writeHead).toHaveBeenCalledWith(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
            });

            expect(mockWrite).toHaveBeenCalledWith('data: {"type":"connected"}\n\n');
            expect(mockWrite).toHaveBeenCalledWith(
                'data: {"code":"console.log(\\"Hello\\");"}\n\n'
            );
            expect(req.on).toHaveBeenCalledWith('close', expect.any(Function));
        });

        it('should handle snapshot errors', async () => {
            const req = { params: { meetingId: '12345' }, on: jest.fn() };
            const res = {
                writeHead: jest.fn(),
                write: mockWrite,
                end: mockEnd,
            };

            const error = new Error('Snapshot listener error');
            onSnapshot.mockImplementation((_, __, onError) => {
                onError(error);
            });

            const next = jest.fn();
            await router.handle(req, res, next);

            expect(res.write).toHaveBeenCalledWith(
                'data: {"type":"error","message":"Snapshot listener error"}\n\n'
            );
        });
    });
});
