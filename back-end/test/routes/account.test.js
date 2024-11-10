const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const loggedIn = require('../../fillerData/loggedIn');

const BASE_PATH = '/api/account';
const { expect } = chai;

chai.use(chaiHttp)


describe(`GET ${BASE_PATH}/authUser for Signed In User`, () => {
  it('should return a 200 status and an user object', (done) => {
    chai
      .request(app)
      .get(`${BASE_PATH}/authUser `)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('id').satisfy(id => typeof id === 'number')
        done()
      })
  })
})

describe(`GET ${BASE_PATH}/authUser for User Not Signed In`, () => {
  it('should return a 200 status and null', (done) => {
    loggedIn[0].id = null

    chai
      .request(app)
      .get(`${BASE_PATH}/authUser `)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.null;
        done()
    })
  })
})

describe(`POST ${BASE_PATH}/edit`, () => {
  it('should return a 200 status and update the user\'s profile info', (done) => {
    const requestData = { 'name': '', 'bio': '', 'layout': '', 'profileImg': null}

    chai
      .request(app)
      .post(`${BASE_PATH}/edit`)
      .send(requestData)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message').equal('Your profile was successfully updated');
        done()
      })
  })
})

describe(`POST ${BASE_PATH}/login with Valid Data`, () => {
  it('should return a 200 status', (done) => {
    const requestData = { 'username': 'spongebob', 'password': 'pineappleHouse@1'}

    chai
      .request(app)
      .post(`${BASE_PATH}/login`)
      .send(requestData)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message').equal('Login successful');
        done()
      })
  })
})

describe(`POST ${BASE_PATH}/login with Invalid Username`, () => {
    it('should return a 401 status', (done) => {
      const requestData = { 'username': 'incorrect', 'password': 'pineappleHouse@1'}
  
      chai
          .request(app)
          .post(`${BASE_PATH}/login`)
          .send(requestData)
          .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message').equal('Invalid username or password.');
          done()
          })
    })
})

describe(`POST ${BASE_PATH}/login with Invalid Password`, () => {
  it('should return a 401 status', (done) => {
    const requestData = { 'username': 'spongebob', 'password': 'incorrect'}

    chai
      .request(app)
      .post(`${BASE_PATH}/login`)
      .send(requestData)
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message').equal('Invalid username or password.');
        done()
      })
  })
})

describe(`POST ${BASE_PATH}/register with Valid Data`, () => {
    it('should return a 200 status', (done) => {
        const requestData = { 
            'name': 'Test User', 
            'username': 'test_user', 
            'email': 'test@user', 
            'password': 'password',
            'confirm': 'password'
        }
  
      chai
        .request(app)
        .post(`${BASE_PATH}/register`)
        .send(requestData)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message').equal('Registration successful');
            done()
        })
    })
})

describe(`POST ${BASE_PATH}/register with Invalid Username`, () => {
    it('should return a 401 status', (done) => {
        const requestData = { 
            'name': 'Test User', 
            'username': 'spongebob', 
            'email': 'test@user', 
            'password': 'password',
            'confirm': 'password'
        }
  
      chai
        .request(app)
        .post(`${BASE_PATH}/register`)
        .send(requestData)
        .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message').equal('Username or email already exists.');
          done()
        })
    })
})

describe(`POST ${BASE_PATH}/register with Invalid Password`, () => {
    it('should return a 401 status', (done) => {
        const requestData = { 
        'name': 'Another User', 
        'username': 'another_user', 
        'email': 'another@user', 
        'password': 'password',
        'confirm': 'different'
    }

        chai
        .request(app)
        .post(`${BASE_PATH}/register`)
        .send(requestData)
        .end((err, res) => {
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message').equal('Passwords must match.');
            done()
        })
    })
})

describe(`GET ${BASE_PATH}/user/:username for the Authenticated User`, () => {
    it('should return a 200 status and an object', (done) => {
        const username = 'spongebob'
        chai
            .request(app)
            .get(`${BASE_PATH}/user/${username}`)
            .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('belongsToLoggedIn').equal(true)
            expect(res.body).to.have.property('friends').that.is.a('boolean')
            expect(res.body).to.have.property('user').that.is.an('object')
            expect(res.body).to.have.property('posts').that.is.an('array')
            done()
        })
    })
})

describe(`GET ${BASE_PATH}/user/:username for a Differnt User`, () => {
    it('should return a 200 status and an object', (done) => {
        const username = 'patrick'
        chai
            .request(app)
            .get(`${BASE_PATH}/user/${username}`)
            .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('belongsToLoggedIn').equal(false)
            expect(res.body).to.have.property('friends').that.is.a('boolean')
            expect(res.body).to.have.property('user').that.is.an('object')
            expect(res.body).to.have.property('posts').that.is.an('array')
            done()
        })
    })
})
  
describe(`GET ${BASE_PATH}/user/:username for an Invalid Username`, () => {
    it('should return a 404 status and an error message', (done) => {
        const username = 'test'
        chai
            .request(app)
            .get(`${BASE_PATH}/user/${username}`)
            .end((err, res) => {
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').equal('User not found')
            done()
        })
    })
})

describe(`GET ${BASE_PATH}/user/:username for a Blocked User`, () => {
    it('should return a 404 status and an error message', (done) => {
        const username = 'squidward'
        chai
            .request(app)
            .get(`${BASE_PATH}/user/${username}`)
            .end((err, res) => {
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').equal('User not found')
            done()
        })
    })
})
