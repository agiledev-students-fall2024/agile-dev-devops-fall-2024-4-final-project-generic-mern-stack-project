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
  });