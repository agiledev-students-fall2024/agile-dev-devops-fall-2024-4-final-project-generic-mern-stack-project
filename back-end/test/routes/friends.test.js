const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
chai.should();

chai.use(chaiHttp); 

// TESTING /FRIENDS ROUTE TO RETRIEVE ALL FRIENDSHIPS
describe("GET /api/friends", () => {
    it("should respond with an HTTP 200 status code and return an array of friends", done => {
        chai
            .request(server)
            .get("/api/friends")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                if (res.body.length > 0) {
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("name");
                    res.body[0].should.have.property("username");
                }
                done();
            });
    });
});

// TESTING THE BLOCK FRIEND BUTTON
describe("POST /api/friends/block/:id", () => {
    it("should block the specified user and return a success message", done => {
        const userIdToBlock = 2;
        chai
            .request(server)
            .post(`/api/friends/block/${userIdToBlock}`)
            .end((err, res) => {
                res.shoud.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User blocked and removed from friends successfully");
                done();
            });
    });
});

// TESTING THE REMOVE FRIEND BUTTON
describe("POST /api/friends/remove/:id", () => {
    it("should remove the specified user from friends and return a success message", done => {
        const userIdToRemove = 5;
        chai
            .request(server)
            .post(`/api/friends/remove/${userIdToRemove}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Friend removed successfully");
            });
    });
});

// TESTING THE ADD FRIEND BUTTON
describe("POST /api/friends/request/:id", () => {
    it("should send a friend request and return a success message", done => {
        const userIdToRequest = 4;
        chai 
            .request(server)
            .post(`/api/friends/request/${userIdToRequest}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Friend request sent successfully");
                done();
            });
    });
});

// TESTING THE ACCEPT FRIEND REQUEST BUTTON
describe("POST /api/friends/requests/accept/:id", () => {
    it("should accept a friend request and return a success message", done => {
        const userIdToAccept = 6;
        chai 
            .request(server)
            .post(`/api/friends/requests/accept/${userIdToAccept}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Friend request accepted");
                done();
            });
    });
});

// TESTING THE DECLINE FRIEND REQUEST BUTTON
describe("POST /api/friends/requests/decline/:id", () => {
    it("should decline a friend request and return a success message", done => {
        const userIdToDecline = 6;
        chai 
            .request(server)
            .post(`/api/friends/requests/decline/${userIdToDecline}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Friend request declined");
                done();
            });
    });
});

// TESTING THE CANCEL FRIEND REQUEST BUTTON
describe("POST /api/friends/requests/cancel/:id", () => {
    it("should cancel a sent friend request and return a success message", done => {
        const userIdToCancel = 4;
        chai 
            .request(server)
            .post(`/api/friends/requests/cancel/${userIdToCancel}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Friend request canceled");
                done();
            });
    });
});

// TESTING THE UNBLOCK FRIEND BUTTON
describe("POST /api/friends/unblock/:id", () => {
    it("should unblock the specified user and return a success message", done => {
        const userIdToUnblock = 3;
        chai 
            .request(server)
            .post(`/api/friends/unblock/${userIdToUnblock}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User unblocked successfully");
                done();
            });
    });
});
