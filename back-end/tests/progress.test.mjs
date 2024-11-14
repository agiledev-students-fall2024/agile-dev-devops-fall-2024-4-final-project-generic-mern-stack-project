import { expect } from "chai";
import request from "supertest";
import app from "../src/app.mjs";

describe("GET /api/progress-tracker", () => {
  it("should fetch progress information and return a 200 status", async () => {
    const res = await request(app).get("/api/progress-tracker");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    res.body.forEach((item) => {
      // Check that item is an object
      expect(item).to.be.an("object");

      // Check presence and types of required properties
      expect(item).to.have.property("id").that.is.a("number");
      expect(item).to.have.property("username").that.is.a("string");
      expect(item).to.have.property("challenges").that.is.an("array");

      // Additional array validation for challenges
      item.challenges.forEach((challenge) => {
        expect(challenge).to.be.an("object");
        expect(challenge).to.have.property("name").that.is.a("string");
        expect(challenge).to.have.property("completed").that.is.a("boolean");
      });
    });
  });

  it("should return a 500 status if the API fails", async () => {
    process.env.MOCK_ERROR = "true";
    const res = await request(app).get("/api/challenges");
    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal("Failed to fetch activity tracker data");
    process.env.MOCK_ERROR = "false";
  });
});
