const { Router } = require("express");
const { userAuth } = require("../middlewares/auth-middleware");
const studentsController = require("../controllers/students");
const router = Router();

// Route to get all students
router.get("/get-students", userAuth, studentsController.getAllStudents);

module.exports = router;
