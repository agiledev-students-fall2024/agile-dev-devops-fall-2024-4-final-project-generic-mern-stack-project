const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const usersPath = path.join(__dirname, '../data/users.json');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller', () => {
    before(() => {
        // Setup: Clear the users.json file before tests
        fs.writeFileSync(usersPath, JSON.stringify([])); // Clear data
    });

    describe('POST /api/auth/signup', () => {
        it('should sign up a new user successfully', (done) => {
            chai.request(app)
                .post('/api/auth/signup')
                .send({ email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'User registered successfully');
                    done();
                });
        });

        it('should return an error if user already exists', (done) => {
            chai.request(app)
                .post('/api/auth/signup')
                .send({ email: 'test@example.com', password: 'password123' }) // Attempting to sign up with the same email again
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message', 'User already exists');
                    done();
                });
        });
    });

    describe('POST /api/auth/login', () => {
        it('should log in an existing user successfully', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Login successful');
                    done();
                });
        });

        it('should return an error for invalid credentials', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' }) // Correct email but wrong password
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Invalid credentials');
                    done();
                });
        });
    });
});
