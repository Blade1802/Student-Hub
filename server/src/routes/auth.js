const { Router } = require("express");
const { getUsers, login, protected } = require("../controllers/auth");
const loginValidation = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();

router.get("/get-users", getUsers);
router.get("/login", loginValidation, validationMiddleware, login);
router.get("/protected", userAuth, protected);

module.exports = router;
