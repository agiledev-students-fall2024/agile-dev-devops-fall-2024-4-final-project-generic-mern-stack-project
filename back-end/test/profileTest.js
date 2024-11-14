import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

describe("GET /api/profile", () => {
  it("should return user profile data", async () => {
    const response = await request(server)
      .get("/api/profile")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("username");
    expect(response.body.username).to.equal("johnDoe"); // since we are hardcoding user data
  });
});
