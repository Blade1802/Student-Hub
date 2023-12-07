const { Router } = require("express");
const { getTasks } = require("../controllers/tasks");
const router = Router();

router.get("/get-tasks/:id", getTasks);

module.exports = router;
