import { use, expect } from 'chai'
import chaiHttp from 'chai-http';
import request from "supertest";
const chai = use(chaiHttp)



import app from '../app.js';
describe('Calendar API', () => {
    it('GET /calendar/month/:year/:month/tasks - Fetch task counts for daily view', async () => {
        const year = 2024;
        const month = 5; // May
    
        const res = await request(app).get(`/calendar/month/${year}/${month}/tasks`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(new Date(year, month, 0).getDate());
    
        res.body.forEach(dayTask => {
            expect(dayTask).to.have.property('day').that.is.a('number');
            expect(dayTask).to.have.property('count').that.is.a('number');
            expect(dayTask.count).to.be.at.least(0).and.at.most(4);
      });
    });
  
    it('GET /calendar/:month/:day/:year - Fetch all tasks', async function(){
        this.timeout(5000); // Notice, it may take longer to fetch the data, so extend time span
        const month = 5; 
        const day = 15;
        const year = 2024;
  
        const res = await request(app).get(`/calendar/${month}/${day}/${year}`);
        expect(res.body).to.be.an('array');
        if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('status');
            expect(res.body[0]).to.have.property('subject');
          }
    });


    describe('Calendar API - Monthly Task Counts', () => {
    
      // Test for fetching task counts for each day of a specific month and verify correct dates
      it('GET /calendar/month/:year/:month/tasks - should fetch correct day counts for each day of a month', async () => {
          const year = 2024
          const month = 2 // February in a leap year (2024), so we expect 29 days
  
          // Make a GET request to the calendar endpoint for task counts in the specified month
          const res = await request(app).get(`/calendar/month/${year}/${month}/tasks`)
          
          // Check that the status code is 200 and response is an array
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
  
          // Calculate the expected number of days in the specified month and year
          const expectedDaysInMonth = new Date(year, month, 0).getDate()
          expect(res.body.length).to.equal(expectedDaysInMonth)
  
          // Verify each day in the response matches the correct day count within the month
          res.body.forEach(dayTask => {
              expect(dayTask).to.have.property('day').that.is.a('number')
              expect(dayTask.day).to.be.within(1, expectedDaysInMonth) // Should be between 1 and the last day of the month
          })
      })
  
      // Test for a month with 30 days to ensure it returns the correct last day
      it('GET /calendar/month/:year/:month/tasks - should return correct number of days for a 30-day month', async () => {
          const year = 2024
          const month = 4 // April, which has 30 days
  
          const res = await request(app).get(`/calendar/month/${year}/${month}/tasks`)
          
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
  
          const expectedDaysInMonth = 30 // April has 30 days
          expect(res.body.length).to.equal(expectedDaysInMonth)
  
          res.body.forEach(dayTask => {
              expect(dayTask).to.have.property('day').that.is.a('number')
              expect(dayTask.day).to.be.within(1, expectedDaysInMonth) // Days should be within 1 to 30
          })
      })
  
      // Test for a month with 31 days to ensure it returns the correct last day
      it('GET /calendar/month/:year/:month/tasks - should return correct number of days for a 31-day month', async () => {
          const year = 2024
          const month = 7 // July, which has 31 days
  
          const res = await request(app).get(`/calendar/month/${year}/${month}/tasks`)
          
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
  
          const expectedDaysInMonth = 31 // July has 31 days
          expect(res.body.length).to.equal(expectedDaysInMonth)
  
          res.body.forEach(dayTask => {
              expect(dayTask).to.have.property('day').that.is.a('number')
              expect(dayTask.day).to.be.within(1, expectedDaysInMonth) // Days should be within 1 to 31
          })
      })
  })

    
  });