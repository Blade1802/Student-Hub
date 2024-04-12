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
app.use("/api/auth", require("../../src/routes/auth"));

describe("Auth API", () => {
  afterAll(async () => {
    await db.closePool(); // Ensure the pool is closed after all tests
  });

  describe("GET /get-users", () => {
    test("It should respond with results JSON", async () => {
      const response = await request(app).get("/api/auth/get-users");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("results");
    });
  });

  describe("GET /authCheck", () => {
    test("It should respond with user", async () => {
      const response = await request(app).get("/api/auth/authCheck");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("user");
    });
  });

  describe("GET /protected", () => {
    test("It should respond with protected information", async () => {
      const response = await request(app).get("/api/auth/protected");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("info");
    });
  });
});
