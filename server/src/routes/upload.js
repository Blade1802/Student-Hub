const { userAuth } = require("../middlewares/auth-middleware");
const upload = require("../middlewares/multer-middleware");
const { Router } = require("express");
const router = Router();

// POST route to handle image upload
router.post("/upload", userAuth, upload.single("image"), (req, res) => {
  try {
    // After a successful upload, req.file will contain information about the uploaded file
    console.log(req.file);

    // Send a response or perform further operations
    res.send("File uploaded successfully");
  } catch (error) {
    res.status(400).send("Error uploading file");
  }
});

module.exports = router;
