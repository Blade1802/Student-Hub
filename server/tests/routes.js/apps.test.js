const request = require("supertest");
const express = require("express");
const app = express();
const db = require("../../src/db");

jest.mock("../../src/middlewares/auth-middleware", () => ({
  userAuth: (req, res, next) => {
    req.user = {
      user_id: "1",
      user_email: "admin@mytudublin.ie",
      user_type: "admin",
    };
    next(); // Proceed to next middleware or route handler
  },
}));

// Middleware and routes setup
app.use(express.json());
app.use("/api/apps", require("../../src/routes/apps"));

describe("Apps API", () => {
  afterAll(async () => {
    await db.closePool(); // Ensuring the pool is closed after all tests are done
  });

  describe("GET /get-apps", () => {
    test("It should respond with app list", async () => {
      const response = await request(app).get("/api/apps/get-apps");

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });
  });
});
