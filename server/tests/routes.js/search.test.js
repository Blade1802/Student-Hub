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
app.use("/api/search", require("../../src/routes/search"));

describe("Search API", () => {
  beforeAll(async () => {
    await db.connectDB();
  });
  afterAll(async () => {
    await db.closeDB(); // Ensuring the pool is closed after all tests are done
    await db.closePool();
  });

  describe("GET /", () => {
    test.only("It should respond with search result", async () => {
      const response = await request(app).get("/api/search?query=Jo");

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("students");
      expect(response.body).toHaveProperty("tasks");
    });
  });
});
