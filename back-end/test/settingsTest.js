// unit tests for settings routes
import { expect } from 'chai';
import request from "supertest";
import server from "../app.js";

//check response of account settings route
describe("GET request to /api/account-settings route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/account-settings")
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('username')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
    })
})

// check response of blocked users routes
describe("GET request to /api/blocked-users route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/blocked-users")
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.above(0)
    })
})

describe("POST request to /api/blocked-users route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).post("/api/blocked-users").send({ id: 100, username: 'foostein' })
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.length.above(0)
            });
    })
})

// check response of blocked communities routes
describe("GET request to /api/blocked-communities route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/blocked-communities")
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.above(0)
    })
})

// check response of muted words routes
describe("GET request to /api/muted-words route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/muted-words")
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.above(0)
    })
})

/*
// check response of color mode routes
describe("GET request to /api/color-mode route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/color-mode")
        expect(res.status).to.equal(200)
\    })
})

// check response of image mode routes
describe("GET request to /api/image-mode route", () => {
    it("it should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/image-mode")
        expect(res.status).to.equal(200)
    })
})
*/

