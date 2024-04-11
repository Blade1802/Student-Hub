const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    // Construct filename: [current timestamp]-[original filename]
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage engine
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // Filter files: ensure the file is an image
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

module.exports = upload;
