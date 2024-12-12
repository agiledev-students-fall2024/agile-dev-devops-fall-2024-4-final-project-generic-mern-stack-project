import assert from "assert";
import request from "supertest";
import app from "../app.js";

describe("Account API", function () {
  
  describe("GET /api/accounts", function () {
    it("should return all accounts", function (done) {
      request(app)
        .get("/api/accounts")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body));
          res.body.forEach((account) => {
            assert("id" in account);
            assert("type" in account);
            assert("amount" in account);
            assert("number" in account);
          });
          done();
        });
    });
  });

  describe("POST /api/accounts", function () {
    it("should create a new account and return it", function (done) {
      const newAccount = {
        type: "Checking",
        amount: 1000,
        number: "12345"
      };

      request(app)
        .post("/api/accounts")
        .send(newAccount)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const account = res.body;
          assert.equal(typeof account, "object");
          assert("id" in account);
          assert.equal(account.type, "Checking");
          assert.equal(account.amount, 1000);
          assert.equal(account.number, "12345");
          done();
        });
    });
  });

});

describe("Debt API", function () {

  describe("GET /api/debts", function () {
    it("should return all debts", function (done) {
      request(app)
        .get("/api/debts")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body));
          res.body.forEach((debt) => {
            assert("id" in debt);
            assert("type" in debt);
            assert("amount" in debt);
            assert("dueDate" in debt);
            assert("paymentSchedule" in debt);
          });
          done();
        });
    });
  });

  describe("POST /api/debts", function () {
    it("should create a new debt and return it", function (done) {
      const newDebt = {
        type: "Loan",
        amount: 5000,
        dueDate: "2024-02-01",
        paymentSchedule: "Monthly"
      };

      request(app)
        .post("/api/debts")
        .send(newDebt)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const debt = res.body;
          assert.equal(typeof debt, "object");
          assert("id" in debt);
          assert.equal(debt.type, "Loan");
          assert.equal(debt.amount, 5000);
          assert.equal(debt.dueDate, "2024-02-01");
          assert.equal(debt.paymentSchedule, "Monthly");
          done();
        });
    });
  });

});