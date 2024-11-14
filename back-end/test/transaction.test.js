import assert from "assert";
import request from "supertest";
import app from "../app.js";

describe("Transaction API", function () {

  describe("GET /api/transactions", function () {
    it("should return all transactions", function (done) {
      request(app)
        .get("/api/transactions")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body));
          res.body.forEach((transaction) => {
            assert("id" in transaction);
            assert("merchant" in transaction);
            assert("category" in transaction);
            assert("amount" in transaction);
            assert("date" in transaction);
          });
          done();
        });
    });
  });

  describe("POST /api/transactions", function () {
    it("should create a new transaction and return it", function (done) {
      const newTransaction = {
        merchant: "Test Merchant",
        category: "Test Category",
        amount: 100,
        date: "2024-01-01"
      };

      request(app)
        .post("/api/transactions")
        .send(newTransaction)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const transaction = res.body;
          assert.equal(typeof transaction, "object");
          assert("id" in transaction);
          assert.equal(transaction.merchant, "Test Merchant");
          assert.equal(transaction.category, "Test Category");
          assert.equal(transaction.amount, 100);
          assert.equal(transaction.date, "2024-01-01");
          done();
        });
    });
  });

});