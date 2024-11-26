import { expect } from "chai";
import request from "supertest";
import app from "../src/app.mjs";

describe("GET /api/users", () => {
  it("should fetch user information and return a 200 status", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    res.body.forEach((user) => {
      // Check that item is an object
      expect(user).to.be.an("object");

      // Check presence and types of required properties
      expect(user).to.have.property("username").that.is.a("string");

      expect(user).to.have.property("recipes").that.is.an("array");
      user.recipes.forEach((recipe) => {
        expect(recipe).to.have.property("name").that.is.a("string")
        expect(recipe).to.have.property("completed").that.is.a("boolean")
      })

      expect(user).to.have.property("activities").that.is.an("array");
      user.activities.forEach((activity) => {
        expect(activity).to.have.property("name").that.is.a("string")

        expect(activity).to.have.property("description").that.is.a("string")

        expect(activity).to.have.property("date").that.is.a("string")
        expect(activity.date.split('/').length).to.equal(3)
        let [month, day, year] = activity.date.split('/');
        month = Number(month)
        day = Number(day)
        year = Number(year)
        expect(month).to.be.above(0 + 1)
        expect(month).to.be.below(13 + 1)
        expect(day).to.be.above(0)
        expect(day).to.be.below(32)
        expect(year).to.be.above(-1)

        expect(activity).to.have.property("duration").that.is.a("number")

        expect(activity).to.have.property("image").that.is.a("string")
      })
    });
  });

  it("should return a 500 status if the API fails", async () => {
    process.env.MOCK_ERROR = "true";
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal("Failed to fetch user data");
    process.env.MOCK_ERROR = "false";
  });
});
