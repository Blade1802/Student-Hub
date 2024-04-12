const { userAuth } = require("../middlewares/auth-middleware");
const announcementsController = require("../controllers/announcements");
const upload = require("../middlewares/multer-middleware");

const { Router } = require("express");
const router = Router();

router.get(
  "/get-announcements",
  userAuth,
  announcementsController.getAnnouncements
);
router.post(
  "/create-announcement",
  userAuth,
  upload.single("announcementImage"),
  announcementsController.createAnnouncement
);

module.exports = router;
