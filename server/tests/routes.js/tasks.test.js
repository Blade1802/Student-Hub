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
app.use("/api/tasks", require("../../src/routes/tasks"));

describe("Tasks API", () => {
  afterAll(async () => {
    await db.closePool(); // Ensure the pool is closed after all tests
  });

  describe("GET /get-tasks/:id", () => {
    test("It should respond with task list JSON", async () => {
      const response = await request(app).get("/api/tasks/get-tasks/1");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("tasks");
    });
  });

  describe("POST /create-tasks", () => {
    test("It should create a task and return taskCreated", async () => {
      const taskData = {
        title: "Test Task",
        url: "https://www.google.co.in/",
      };
      const response = await request(app)
        .post("/api/tasks/create-tasks")
        .send(taskData);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveProperty("taskCreated");
    });

    test("It should return a 400 error for missing title and URL", async () => {
      const taskData = {}; // Sending empty data should trigger validation errors
      const response = await request(app)
        .post("/api/tasks/create-tasks")
        .send(taskData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toStrictEqual([
        {
          location: "body",
          msg: "Title is empty",
          path: "title",
          type: "field",
        },
        { location: "body", msg: "URL is empty", path: "url", type: "field" },
      ]);
    });
  });
});
