import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('activity routes', function() {
    describe('GET /activities/location/:locationId', function() {
        it('should return activities for a valid locationId', async function(){
            const locationId = 'location_004';
            const response = await request(app).get(`/activities/location/${locationId}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(activity=>{
                expect(activity.locationId).to.equal(locationId);
            });
        });

        it('should return 404 if no activities are found', async function(){
            const locationId = 'invalid location id';
            const response = await request(app).get(`/activities/location/${locationId}`);

            expect(response.status).to.equal(404);
        });
    });

    describe('POST /activities', function() {
        it('should create a new activity and return it with status 201', async function(){
            const newAct = {
                name: "nyu",
                address: "181 Bleeker Street",
                comments: []
            };
            const response = await request(app).post(`/activities`).send(newAct);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id').that.includes('activity_'); // check to see if other fields have been created
        });
    });

    describe('POST /activities/:activityId/upvote', function() {
        it('should increase the vote count for an activity', async function() {
            const activityId = 'activity_001';
            const response = await request(app).post(`/activities/${activityId}/upvote`);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('votes').that.is.a('number');
        });

        it('should return 404 if activity to upvote is not found', async function() {
            const activityId = 'invalid_activity_id';
            const response = await request(app).post(`/activities/${activityId}/upvote`);
            expect(response.status).to.equal(404);
        });
    });

    describe('POST /activities/:activityId/downvote', function() {
        it('should decrease the vote count for an activity', async function() {
            const activityId = 'activity_001';
            const response = await request(app).post(`/activities/${activityId}/downvote`);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('votes').that.is.a('number');
        });

        it('should return 404 if activity to downvote is not found', async function() {
            const activityId = 'invalid_activity_id';
            const response = await request(app).post(`/activities/${activityId}/downvote`);
            expect(response.status).to.equal(404);
        });
    });

    describe('POST /activities/:activityId/comments', function() {
        it('should add a comment to an activity and return it', async function() {
            const activityId = 'activity_001';
            const newComment = {
                userId: 'user_123',
                commentString: 'Great activity!'
            };
            const response = await request(app).post(`/activities/${activityId}/comments`).send(newComment);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id').that.includes('comment_');
            expect(response.body.commentString).to.equal('Great activity!');
        });

        it('should return 404 if activity to comment on is not found', async function() {
            const activityId = 'invalid_activity_id';
            const newComment = {
                userId: 'user_123',
                commentString: 'Great activity!'
            };
            const response = await request(app).post(`/activities/${activityId}/comments`).send(newComment);
            expect(response.status).to.equal(404);
        });
    });
});