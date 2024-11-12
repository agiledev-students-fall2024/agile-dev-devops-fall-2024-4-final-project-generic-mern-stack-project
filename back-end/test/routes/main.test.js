const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const friendships = require('../../fillerData/friendships');
const blockedData = require('../../fillerData/blocked');
const loggedInData = require('../../fillerData/loggedIn');
const authUserId = loggedInData[0].id;

chai.use(chaiHttp);
chai.should();

// Helper function to retrieve friends of the logged-in user
function getFriendIds(userId) {
  return friendships
    .filter(item => item.user_id_1 === userId || item.user_id_2 === userId)
    .map(item => item.user_id_1 === userId ? item.user_id_2 : item.user_id_1);
}

// Helper function to retrieve blocked user IDs for the logged-in user
function getBlockedUserIds(userId) {
  return blockedData
    .filter(item => item.blocker_id === userId || item.blocked_id === userId)
    .map(item => item.blocker_id === userId ? item.blocked_id : item.blocker_id);
}

// test for home route
describe('GET /api/main/', () => {

  // check the return 
  it("should return a HTTP 200 status, an object containing a 'user' object and 'posts' array", (done) => {
    chai
      .request(server)
      .get('/api/main/')
      .end((err, res) => {
        if (err) return done(err);

        res.should.have.status(200); 
        res.body.should.be.an('object'); // route sends back an object
        res.body.should.have.property('user').that.is.an('object'); //check property for user
        res.body.should.have.property('posts').that.is.an('array'); //check property for the posts array
        done() 
      });
  });

  // check the data is correct
  it("should return friends' posts only, sorted by date", (done) => {
    chai.request(server)
      .get('/api/main/')
      .end((err, res) => {
        if (err) return done(err);

        const friendIds = getFriendIds(authUserId); // Get friend IDs based on friendships data
        res.body.posts.should.be.an('array');
        res.body.posts.forEach(post => {
          // Check that each post is authored by a friend of authUserId
          friendIds.should.include(post.author_id);
        });

        // Check if posts are sorted by date (newest first)
        const dates = res.body.posts.map(post => new Date(post.date));
        for (let i = 1; i < dates.length; i++) {
          dates[i].should.be.at.most(dates[i - 1]); // Check descending order
        }

        done();
      });
  });
});

// test for explore route
describe('GET /api/main/explore', () => {
  it("should return a HTTP 200 status, an object containing a 'user' object and 'posts' array", done => {
    chai
      .request(server)
      .get('/api/main/explore')
      .end((err, res) => {
        if (err) return done(err);

        res.should.have.status(200); 
        res.body.should.be.an('object'); // route sends back an object
        res.body.should.have.property('user').that.is.an('object'); //check property for user
        res.body.should.have.property('posts').that.is.an('array'); //check property for the posts array
        done() 
      })
  })

  it("should return non-blocked users' posts only, excluding the logged-in user's posts", (done) => {
    chai.request(server)
      .get('/api/main/explore')
      .end((err, res) => {
        if (err) return done(err);

        const blockedUserIds = getBlockedUserIds(authUserId); // Get blocked user IDs for authUserId
        res.body.posts.forEach(post => {
          post.author_id.should.not.equal(authUserId); // Exclude logged-in user's posts
          blockedUserIds.should.not.include(post.author_id); // Ensure blocked users' posts are excluded
        });
        done();
      });
  });

})