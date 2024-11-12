import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

describe("GET /api/home", () => {
  it("should return an array of posts and have a status code of 200", (done) => {
    request(server)
      .get("/api/home")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0]).to.have.all.keys([
          "id",
          "profilePic",
          "name",
          "userName",
          "text",
          "likes",
          "images",
        ]);
        expect(res.body[0].images).to.be.an("array");
        expect(res.body[0].images).to.have.lengthOf(1);

        done();
      });
  });
});
