// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../app'); 

// chai.use(chaiHttp); 

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const postsData = require('../../fillerData/posts');
const loggedInData = require('../../fillerData/loggedIn');

chai.use(chaiHttp);
const { expect } = chai;

const BASE_PATH = '/api/posts';

// Tests for posts.js routes
describe('Posts API', () => {
  beforeEach(() => {
    // Reset logged-in user and posts data before each test
    loggedInData[0].id = 1;
    postsData.length = 0;
    postsData.push(
      {
        id: 1,
        title: 'Sample Post',
        content: 'This is a sample post.',
        author_id: 1,
        date: '2024-11-01T10:00:00Z',
        imageUrl: '',
        comments: []
      }
    );
  });

  // Test for creating a new post
  describe(`POST ${BASE_PATH}/create`, () => {
    it('should create a new post and return it', (done) => {
      const requestData = {
        title: 'New Post',
        content: 'Content of the new post.',
        imageUrl: 'http://example.com/image.jpg'
      };

      chai
        .request(server)
        .post(`${BASE_PATH}/create`)
        .send(requestData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Post created successfully');
          expect(res.body.post).to.include({
            title: requestData.title,
            content: requestData.content,
            imageUrl: requestData.imageUrl
          });
          done();
        });
    });
  });

  // Test for editing a post
  describe(`PUT ${BASE_PATH}/edit/:id`, () => {
    it('should update an existing post', (done) => {
      const postId = 1;
      const requestData = {
        title: 'Updated Post Title',
        content: 'Updated content of the post.',
        imageUrl: 'http://example.com/updated-image.jpg'
      };

      chai
        .request(server)
        .put(`${BASE_PATH}/edit/${postId}`)
        .send(requestData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Post updated successfully');
          expect(res.body.post).to.include({
            title: requestData.title,
            content: requestData.content,
            imageUrl: requestData.imageUrl
          });
          done();
        });
    });

    it('should return 404 if the post is not found or not owned by the user', (done) => {
      const postId = 999; // Non-existent post ID
      const requestData = {
        title: 'Updated Title',
        content: 'Updated Content'
      };

      chai
        .request(server)
        .put(`${BASE_PATH}/edit/${postId}`)
        .send(requestData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Post not found or you do not have permission to edit this post.');
          done();
        });
    });
  });

  // Test for fetching a single post
  describe(`GET ${BASE_PATH}/:id`, () => {
    it('should return a post by its ID', (done) => {
      const postId = 1;

      chai
        .request(server)
        .get(`${BASE_PATH}/${postId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include({
            id: postId,
            title: 'Sample Post',
            content: 'This is a sample post.'
          });
          done();
        });
    });

    it('should return 404 if the post is not found', (done) => {
      const postId = 999; // Non-existent post ID

      chai
        .request(server)
        .get(`${BASE_PATH}/${postId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Post not found');
          done();
        });
    });
  });
});
