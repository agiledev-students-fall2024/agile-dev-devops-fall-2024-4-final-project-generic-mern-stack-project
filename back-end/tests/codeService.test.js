const assert = require('assert');
const sinon = require('sinon');
const codeService = require('../services/codeService');

// Mock Firestore
const mockCollection = jest.fn();
const mockAddDoc = jest.fn();

describe('codeService', () => {
    let mockDb;

    beforeEach(() => {
        // Mock Firestore instance
        mockDb = {
            collection: mockCollection,
        };

        // Inject the mock Firestore instance into codeService
        codeService.setDb(mockDb);

        // Reset mocks
        mockCollection.mockReset();
        mockAddDoc.mockReset();
    });

    describe('testConnection', () => {
        it('should write a test document and return true on success', async () => {
            mockCollection.mockReturnValue({}); // Simulate collection call
            mockAddDoc.mockResolvedValue({ id: 'testDocId' }); // Simulate successful addDoc

            const result = await codeService.testConnection();

            // Assertions
            expect(mockCollection).toHaveBeenCalledWith(mockDb, 'test_connection');
            expect(mockAddDoc).toHaveBeenCalled();
            assert.strictEqual(result, true, 'Expected testConnection to return true');
        });

        it('should return false if writing a test document fails', async () => {
            mockCollection.mockReturnValue({}); // Simulate collection call
            mockAddDoc.mockRejectedValue(new Error('Firestore error')); // Simulate addDoc failure

            const result = await codeService.testConnection();

            // Assertions
            expect(mockCollection).toHaveBeenCalledWith(mockDb, 'test_connection');
            expect(mockAddDoc).toHaveBeenCalled();
            assert.strictEqual(result, false, 'Expected testConnection to return false');
        });
    });
});
