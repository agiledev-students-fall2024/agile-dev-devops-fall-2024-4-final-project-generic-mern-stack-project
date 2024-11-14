import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('location routes', function(){

    //we don't really need this route for anything, just wrote this test to be safe
    describe('GET /locations', function(){
        it('should return all locations in the database', async function(){
            const response = await request(app).get(`/locations`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    describe('GET /locations/trip/:tripId', function(){
        it('should return all locations for a single trip', async function(){
            const tripId = 'trip_456';
            const response = await request(app).get(`/locations/trip/${tripId}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(loc => {
                expect(loc.tripId).to.equal(tripId);
            });
        });

        it('should return 404 for a tripId that does not exist', async function(){
            const tripId = 'invalid tripId';
            const response = await request(app).get(`/locations/trip/${tripId}`);

            expect(response.status).to.equal(404);
            
        });
    });

    describe('POST /locations', function(){
        it('should should create a new activity and respond with status 201', async function() {
            const newLocation = {
                name: 'nyu',
                address: '181 bleeker',
            };
            const response = await request(app).post(`/locations`).send(newLocation);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id').that.includes('location_');
        });
    });
});