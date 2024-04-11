const { Router } = require("express");
const upload = require("../middlewares/multer-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const appController = require("../controllers/apps");
const router = Router();

// Route to retrieve app list
router.get("/get-apps", userAuth, appController.getApps);

// Route for uploading app data; the upload.single() middleware handles the file upload
router.post(
  "/upload-app",
  userAuth,
  upload.single("appImage"),
  appController.uploadApp
);

// Route to delete an app by ID
router.delete("/delete-app/:appId", userAuth, appController.deleteApp);

module.exports = router;
