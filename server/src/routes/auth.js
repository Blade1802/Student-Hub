const { Router } = require("express");
const { getUsers, login, protected, logout } = require("../controllers/auth");
const loginValidation = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();

// Routes related to authorisation
router.get("/get-users", getUsers);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/authCheck", userAuth, async (req, res) => {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/protected", userAuth, protected);
router.get("/logout", logout);

module.exports = router;
