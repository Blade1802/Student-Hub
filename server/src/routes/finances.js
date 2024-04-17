const { Router } = require("express");
const { userAuth } = require("../middlewares/auth-middleware");
const { getPayments } = require("../controllers/finances");
const router = Router();

// Routes related to finances
router.get("/get-payments/:id", userAuth, getPayments);

module.exports = router;
