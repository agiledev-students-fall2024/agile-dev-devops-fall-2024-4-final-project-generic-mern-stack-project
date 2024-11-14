import { expect } from "chai";
import request from "supertest";
import app from "../src/app.mjs";

describe("GET /api/record-activity", () => {
  it("should fetch recipe schema and return JSON data with a 200 status", async () => {
    const res = await request(app).get("/api/record-activity");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

    res.body.forEach((recipe) => {
      expect(recipe).to.be.an("object");

      expect(recipe).to.have.property("id").that.is.a("number");
      expect(recipe).to.have.property("recipe_name").that.is.a("string");
      expect(recipe).to.have.property("recipe_description").that.is.a("string");

      expect(recipe).to.have.property("recipe_steps").that.is.an("object");
      expect(recipe.recipe_steps).to.have.property("step").that.is.an("array");
      recipe.recipe_steps.step.forEach((step) => {
        expect(step).to.be.a("string");
      });

      expect(recipe).to.have.property("ingredients").that.is.an("object");
      expect(recipe.ingredients).to.have.property("item").that.is.an("array");
      recipe.ingredients.item.forEach((ingredient) => {
        expect(ingredient).to.be.a("string");
      });

      expect(recipe).to.have.property("duration").that.is.a("number");
    });
  });

  it("should return a 500 status if the API fails", async () => {
    process.env.MOCK_ERROR = "true";
    const res = await request(app).get("/api/record-activity");
    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal("Failed to fetch recipe data");
    process.env.MOCK_ERROR = "false";
  });
});
