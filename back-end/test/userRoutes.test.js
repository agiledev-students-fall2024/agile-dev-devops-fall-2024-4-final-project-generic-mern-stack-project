const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('User Routes', () => {
  describe('/GET user settings by username', () => {
    it('should GET user settings for a valid username', (done) => {
      chai.request(app)
        .get('/user/settings/Dreamer1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('username', 'Dreamer1');
          expect(res.body).to.have.property('aboutMe');
          expect(res.body).to.have.property('number');
          expect(res.body).to.have.property('otherSocialMedia');
          expect(res.body).to.have.property('friendsList').that.is.an('array');
          done();
        });
    });

    it('should return 404 for a non-existing username', (done) => {
      chai.request(app)
        .get('/user/settings/NonExistentUser')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'User not found');
          done();
        });
    });
  });

  // Test the PUT user settings route
  describe('/PUT update user settings by username', () => {
    it('should UPDATE user settings for a valid username', (done) => {
      const updatedSettings = {
        aboutMe: 'Updated About Me',
        number: '111-222-3333',
        otherSocialMedia: 'https://updated-example.com/dreamer1',
        friendsList: ['UpdatedFriend1', 'UpdatedFriend2']
      };

      chai.request(app)
        .put('/user/settings/Dreamer1')
        .send(updatedSettings)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'User settings updated successfully');
          expect(res.body.user).to.have.property('aboutMe', updatedSettings.aboutMe);
          expect(res.body.user).to.have.property('number', updatedSettings.number);
          expect(res.body.user).to.have.property('otherSocialMedia', updatedSettings.otherSocialMedia);
          expect(res.body.user).to.have.property('friendsList').that.includes('UpdatedFriend1');
          done();
        });
    });

    it('should return 404 for updating a non-existing username', (done) => {
      const updatedSettings = {
        aboutMe: 'This user does not exist'
      };

      chai.request(app)
        .put('/user/settings/NonExistentUser')
        .send(updatedSettings)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'User not found');
          done();
        });
    });
  });
});
