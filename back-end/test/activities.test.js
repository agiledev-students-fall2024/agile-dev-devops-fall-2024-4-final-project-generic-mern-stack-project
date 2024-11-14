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
});