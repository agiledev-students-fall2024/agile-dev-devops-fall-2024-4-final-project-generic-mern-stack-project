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
    });
});