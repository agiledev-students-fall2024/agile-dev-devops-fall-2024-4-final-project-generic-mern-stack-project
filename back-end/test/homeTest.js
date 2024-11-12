import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

// Test suite for the /api/home route
describe("GET request to /api/home route", () => {
    it("should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/home");
        expect(res.status).to.equal(200);
    });

    it("should respond with JSON data in the body", async () => {
        const res = await request(server).get("/api/home");
        expect(res.headers["content-type"]).to.include("application/json");
        expect(res.body).to.be.an("array").with.length.above(0);
    });

    it("should contain posts with expected properties", async () => {
        const res = await request(server).get("/api/home");
        
        res.body.forEach(post => {
            expect(post).to.be.an("object");
            expect(post).to.have.property("id").that.is.a("number");
            expect(post).to.have.property("profilePic").that.is.a("string").and.is.not.empty;
            expect(post).to.have.property("name").that.is.a("string").and.is.not.empty;
            expect(post).to.have.property("userName").that.is.a("string").and.is.not.empty;
            expect(post).to.have.property("text").that.is.a("string").and.is.not.empty;
            expect(post).to.have.property("likes").that.is.a("number");
            expect(post).to.have.property("images").that.is.an("array");
        });
    });
});



