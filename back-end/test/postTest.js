import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

// Test suite for the /api/post route
describe("POST request to /api/post route", () => {
    const mockPostData = {
        postContent: "This is a test post",
        selectedOption: "Community 1"
    };

    it("should respond with HTTP 200 status code", async () => {
        const res = await request(server)
            .post("/api/post")
            .send(mockPostData);
        expect(res.status).to.equal(200);
    });

    it("should respond with a JSON object containing a success message and posted data", async () => {
        const res = await request(server)
            .post("/api/post")
            .send(mockPostData);
        expect(res.headers["content-type"]).to.include("application/json");
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message", "Post received successfully");
        expect(res.body).to.have.property("data").that.is.an("object");
        expect(res.body.data).to.have.property("postContent", mockPostData.postContent);
        expect(res.body.data).to.have.property("selectedOption", mockPostData.selectedOption);
    });

    it("should handle errors gracefully", async () => {
        const res = await request(server)
            .post("/api/post")
            .send({}); // Sending an empty request to simulate an error
        expect(res.status).to.be.oneOf([400, 500]); // Adjust based on error handling
    });
});
