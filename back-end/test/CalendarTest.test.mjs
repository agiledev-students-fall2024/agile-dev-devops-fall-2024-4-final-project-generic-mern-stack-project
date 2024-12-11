import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';

// Use chaiHttp as a plugin for chai
chai.use(chaiHttp);

describe('Calendar API', () => {
    // Generate a valid JWT for testing
    const token = jwt.sign({ userId: 'mockUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    it('GET /calendar/month/:year/:month/tasks - Fetch task counts for daily view', async () => {
        const year = 2024;
        const month = 5; // May

        const res = await request(app)
            .get(`/calendar/month/${year}/${month}/tasks`)
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(new Date(year, month, 0).getDate());

        res.body.forEach((dayTask) => {
            expect(dayTask).to.have.property('day').that.is.a('number');
            expect(dayTask).to.have.property('count').that.is.a('number');
            expect(dayTask.count).to.be.at.least(0);
        });
    });

    it('GET /calendar/:month/:day/:year - Fetch all tasks', async () => {
        const month = 5;
        const day = 15;
        const year = 2024;

        const res = await request(app)
            .get(`/calendar/${month}/${day}/${year}`)
            .set('Authorization', `Bearer ${token}`); // Add JWT token

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');

        if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('status');
            expect(res.body[0]).to.have.property('subject');
        }
    });

    describe('Calendar API - Monthly Task Counts', () => {
        it('GET /calendar/month/:year/:month/tasks - should fetch correct day counts for each day of a month', async () => {
            const year = 2024;
            const month = 2; // February in a leap year

            const res = await request(app)
                .get(`/calendar/month/${year}/${month}/tasks`)
                .set('Authorization', `Bearer ${token}`); // Add JWT token

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');

            const expectedDaysInMonth = new Date(year, month, 0).getDate();
            expect(res.body.length).to.equal(expectedDaysInMonth);

            res.body.forEach((dayTask) => {
                expect(dayTask).to.have.property('day').that.is.a('number');
                expect(dayTask.day).to.be.within(1, expectedDaysInMonth);
            });
        });

        it('GET /calendar/month/:year/:month/tasks - should return correct number of days for a 30-day month', async () => {
            const year = 2024;
            const month = 4; // April

            const res = await request(app)
                .get(`/calendar/month/${year}/${month}/tasks`)
                .set('Authorization', `Bearer ${token}`); // Add JWT token

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');

            const expectedDaysInMonth = 30;
            expect(res.body.length).to.equal(expectedDaysInMonth);

            res.body.forEach((dayTask) => {
                expect(dayTask).to.have.property('day').that.is.a('number');
                expect(dayTask.day).to.be.within(1, expectedDaysInMonth);
            });
        });

        it('GET /calendar/month/:year/:month/tasks - should return correct number of days for a 31-day month', async () => {
            const year = 2024;
            const month = 7; // July

            const res = await request(app)
                .get(`/calendar/month/${year}/${month}/tasks`)
                .set('Authorization', `Bearer ${token}`); // Add JWT token

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');

            const expectedDaysInMonth = 31;
            expect(res.body.length).to.equal(expectedDaysInMonth);

            res.body.forEach((dayTask) => {
                expect(dayTask).to.have.property('day').that.is.a('number');
                expect(dayTask.day).to.be.within(1, expectedDaysInMonth);
            });
        });
    });
});
