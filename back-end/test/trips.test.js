import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('trips routes', function(){
    describe('GET /trips/:tripId', function(){
        it('should return a specific trip given a tripId', async function(){
            const tripId = 'trip_456';
            const response = await request(app).get(`/trips/${tripId}`);
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(tripId);
        });

        it('should return 404 if an invalid tripId is sent', async function(){
            const tripId = 'invalid_id';
            const response = await request(app).get(`/trips/${tripId}`);
            expect(response.status).to.equal(404);
        });
    });

    describe('GET /trips/:tripId/locations', function(){
        it('should return locations for a specific trip given a tripId', async function(){
            const tripId = 'trip_456';
            const response = await request(app).get(`/trips/${tripId}/locations`);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(loc => {
                expect(loc.tripId).to.equal(tripId);
            });
        });

        it('should return 404 if an invalid tripId is sent', async function(){
            const tripId = 'invalid_id';
            const response = await request(app).get(`/trips/${tripId}`);
            expect(response.status).to.equal(404);
        });
    });

    describe('POST /trips', function(){
        it('should create a new trip and return a 201 status', async function(){
            const newTrip = {};
            const response = await request(app).post(`/trips`).send(newTrip);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id').that.includes("trip_");
        });
    });
});

// describe('activity routes', function() {
//     describe('GET /activities/location/:locationId', function() {
//         it('should return activities for a valid locationId', async function(){
//             const locationId = 'location_004';
//             const response = await request(app).get(`/activities/location/${locationId}`);

//             expect(response.status).to.equal(200);
//             expect(response.body).to.be.an('array');

//             response.body.forEach(activity=>{
//                 expect(activity.locationId).to.equal(locationId);
//             });
//         });

//         it('should return 404 if no activities are found', async function(){
//             const locationId = 'invalid location id';
//             const response = await request(app).get(`/activities/location/${locationId}`);

//             expect(response.status).to.equal(404);
//         });
//     });

//     describe('POST /activities', function() {
//         it('should create a new activity and return it with status 201', async function(){
//             const newAct = {
//                 name: "nyu",
//                 address: "181 Bleeker Street",
//                 comments: []
//             };
//             const response = await request(app).post(`/activities`).send(newAct);

//             expect(response.status).to.equal(201);
//             expect(response.body).to.have.property('id').that.includes('activity_'); // check to see if other fields have been created
//         });
//     });