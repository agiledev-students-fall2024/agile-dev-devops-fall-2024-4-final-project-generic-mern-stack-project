// services/meetingService.js
const Meeting = require('../models/Meeting');

const meetingService = {
    async createMeeting(meetingId) {
        try {
            const meeting = new Meeting({
                meetingId,
                participants: []
            });
            return await meeting.save();
        } catch (error) {
            console.error('Error creating meeting:', error);
            throw error;
        }
    },

    async endMeeting(meetingId) {
        try {
            const meeting = await Meeting.findOne({ meetingId });
            if (!meeting) {
                throw new Error('Meeting not found');
            }
            
            meeting.status = 'ended';
            meeting.endedAt = new Date();
            return await meeting.save();
        } catch (error) {
            console.error('Error ending meeting:', error);
            throw error;
        }
    },

    async saveCodeHistory(meetingId, codeUpdate) {
        try {
            const meeting = await Meeting.findOne({ meetingId });
            if (!meeting) {
                throw new Error('Meeting not found');
            }

            meeting.codeHistory.push({
                code: codeUpdate.code,
                language: codeUpdate.language,
                timestamp: new Date(),
                author: codeUpdate.author
            });

            return await meeting.save();
        } catch (error) {
            console.error('Error saving code history:', error);
            throw error;
        }
    },

    async getMeetingHistory(meetingId) {
        try {
            const meeting = await Meeting.findOne({ meetingId });
            if (!meeting) {
                throw new Error('Meeting not found');
            }
            return meeting;
        } catch (error) {
            console.error('Error getting meeting history:', error);
            throw error;
        }
    }
};

module.exports = meetingService;