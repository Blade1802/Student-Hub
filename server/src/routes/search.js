const { Router } = require("express");
const { userAuth } = require("../middlewares/auth-middleware");
const searchController = require("../controllers/search");
const router = Router();

router.get("/", userAuth, searchController.getSearchData);

module.exports = router;
