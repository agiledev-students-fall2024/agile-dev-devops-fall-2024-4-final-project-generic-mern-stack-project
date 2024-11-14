// Import necessary modules
import assert from "assert";
import request from "supertest";
import app from '../app.js';

// Test Suite for Goal API
describe("Goal API", function () {

  // Test for GET /goal to retrieve all goals
  describe("GET /goal", function () {
    it("should return all goals", function (done) {
      request(app)
        .get("/goal") // Send a GET request to /goal
        .expect(200)  // Assert status code is 200
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body), "Response should be an array"); // Assert response is an array
          res.body.forEach((goal) => { // Assert each goal has required properties
            assert("id" in goal, "Goal should have an 'id' property");
            assert("name" in goal, "Goal should have a 'name' property");
            assert("target" in goal, "Goal should have a 'target' property");
            assert("current" in goal, "Goal should have a 'current' property");
          });
          done(); // Finish the test
        });
    });
  });

  // Test for POST /goal to create a new goal
  describe("POST /goal", function () {
    it("should create a new goal and return it", function (done) {
      const newGoal = {
        name: "New Test Goal",
        target: 1000,
      };

      request(app)
        .post("/goal")  // Send a POST request to /goal
        .send(newGoal)  // Send newGoal as request body
        .expect(201)    // Assert status code is 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          const goal = res.body.goal;
          assert.equal(typeof goal, "object", "Response should be an object");
          assert("id" in goal, "Goal should have an 'id' property");  
          assert.equal(goal.name, "New Test Goal", "Goal 'name' should match input");  
          assert.equal(goal.target, 1000, "Goal 'target' should match input");  
          assert.equal(goal.current, 0, "Goal 'current' should be initialized to 0"); 
          done();
        });
    });

   
  });
});
