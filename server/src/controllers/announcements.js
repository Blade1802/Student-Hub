// Tasks controller
const db = require("../db");

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await db.query("SELECT * FROM announcements");
    return res.status(200).json({
      announcements: announcements.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

// Create bulk student tasks
const createAnnouncement = async (req, res) => {
  const { announcementsName, announcementsDescription } = req.body;

  const imageUrl = req.file.path; // The path where multer saves the file

  try {
    const query =
      "INSERT INTO announcement(title, image_url, description) VALUES($1, $2, $3) RETURNING *";
    const values = [announcementsName, imageUrl, announcementsDescription];
    const result = await db.query(query, values);

    res.status(200).json({
      announcements: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
};
