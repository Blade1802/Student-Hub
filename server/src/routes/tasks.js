const { Router } = require("express");
const { userAuth } = require("../middlewares/auth-middleware");
const { getTasks, createTasks } = require("../controllers/tasks");
const createTaskValidation = require("../validators/tasks");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const router = Router();

// Routes related to tasks
router.get("/get-tasks/:id", getTasks);
router.post(
  "/create-tasks",
  createTaskValidation,
  validationMiddleware,
  userAuth,
  createTasks
);

module.exports = router;
