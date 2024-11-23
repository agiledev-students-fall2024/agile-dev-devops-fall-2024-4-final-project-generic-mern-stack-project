// services/meetingStorageService.js
const { MongoClient, ObjectId } = require('mongodb');

class MeetingStorageService {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
        this.dbName = "meetingapp";
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            console.log("Connected to MongoDB Atlas");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    async createMeeting(meetingId) {
        try {
            const collection = this.db.collection('meetings');
            const meeting = {
                meetingId,
                createdAt: new Date(),
                lastAccessed: new Date(),
                codeEditor: {
                    code: '// Welcome!',
                    language: 'javascript',
                    lastModified: new Date()
                },
                chat: [],
                whiteboard: null
            };

            await collection.insertOne(meeting);
            return meeting;
        } catch (error) {
            console.error("Error creating meeting:", error);
            throw error;
        }
    }

    async updateMeetingCode(meetingId, code, language) {
        try {
            const collection = this.db.collection('meetings');
            await collection.updateOne(
                { meetingId },
                {
                    $set: {
                        'codeEditor.code': code,
                        'codeEditor.language': language,
                        'codeEditor.lastModified': new Date(),
                        lastAccessed: new Date()
                    }
                }
            );
            return true;
        } catch (error) {
            console.error("Error updating meeting code:", error);
            throw error;
        }
    }

    async getMeeting(meetingId) {
        try {
            const collection = this.db.collection('meetings');
            const meeting = await collection.findOne({ meetingId });
            if (meeting) {
                await collection.updateOne(
                    { meetingId },
                    { $set: { lastAccessed: new Date() } }
                );
            }
            return meeting;
        } catch (error) {
            console.error("Error getting meeting:", error);
            throw error;
        }
    }

    async getPastMeetings(limit = 10) {
        try {
            const collection = this.db.collection('meetings');
            return await collection
                .find()
                .sort({ lastAccessed: -1 })
                .limit(limit)
                .toArray();
        } catch (error) {
            console.error("Error getting past meetings:", error);
            throw error;
        }
    }

    async close() {
        await this.client.close();
    }
}

module.exports = new MeetingStorageService();