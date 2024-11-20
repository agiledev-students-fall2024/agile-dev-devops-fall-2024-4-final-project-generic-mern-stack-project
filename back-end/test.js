const request = require('supertest');
const { expect } = require('chai');
const app = require('./app/app');
const restaurants = require('./restaurants');

describe('GET /restaurants', () => {
  it('should return a list of restaurants with default pagination', (done) => {
    request(app)
      .get('/restaurants')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('total');
        expect(res.body).to.have.property('page', 1);
        expect(res.body).to.have.property('limit', 10);
        expect(res.body).to.have.property('data').with.lengthOf.at.most(10);
        done();
      });
  });
});
describe('POST /restaurants/:id/like', () => {
  it('should like a restaurant', (done) => {
    request(app)
      .post('/restaurants/1/like')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('Restaurant 1 liked');
        done();
      });
  });
});
describe('GET /restaurants/search', () => {
  it('should return restaurants matching the search query', (done) => {
    request(app)
      .get('/restaurants/search')
      .query({ query: 'sushi' })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return 400 if query parameter is missing', (done) => {
    request(app)
      .get('/restaurants/search')
      .expect(400)
      .end((err, res) => {
        expect(res.text).to.equal('Missing query parameter');
        done();
      });
  });
});
describe('GET /restaurants with filters', () => {
  it('should return restaurants filtered by cuisine and neighborhood', (done) => {
    request(app)
      .get('/restaurants')
      .query({ cuisine: 'Italian', neighborhood: 'Downtown' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).to.be.an('array');
        res.body.data.forEach((restaurant) => {
          expect(restaurant.cuisine.toLowerCase()).to.equal('italian');
          expect(restaurant.neighborhood.toLowerCase()).to.equal('downtown');
        });
        done();
      });
  });
});
describe('POST /restaurants/:id/dislike', () => {
  it('should dislike a restaurant', (done) => {
    request(app)
      .post('/restaurants/1/dislike')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('Restaurant 1 disliked');
        done();
      });
  });
});
describe('GET /restaurants error handling', () => {
  it('should handle errors in the restaurants API', (done) => {
    // Temporarily set restaurants to null to simulate an error
    const originalRestaurants = [...restaurants];
    restaurants.length = 0; // Empty the array to simulate an error
    restaurants.push(null); // Add a null entry to cause an error in the route handler

    request(app)
      .get('/restaurants?cuisine=fdsa')
      .expect(500)
      .end((err, res) => {
        expect(res.text).to.equal('Error fetching restaurants');

        // Restore the original data
        restaurants.length = 0;
        restaurants.push(...originalRestaurants);
        done();
      });
  });
});
describe('GET /restaurants/search error handling', () => {
  it('should handle errors in the search API', (done) => {
    // Simulate an error by causing an exception in the route handler
    const originalFilter = Array.prototype.filter;
    Array.prototype.filter = () => {
      throw new Error('Simulated error');
    };
    request(app)
      .get('/restaurants/search')
      .query({ query: 'sushi' })
      .expect(500)
      .end((err, res) => {
        expect(res.text).to.equal('Error searching for restaurant');

        // Restore the original filter method
        Array.prototype.filter = originalFilter;
        done();
      });
  });
});
  