const db = require("../db");

const getApps = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM apps");
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

// Function to handle the uploading of app data
const uploadApp = async (req, res) => {
  const { appName, appLink } = req.body;
  const imageUrl = req.file.path; // The path where multer saves the file

  try {
    const query =
      "INSERT INTO apps(name, image_url, app_link) VALUES($1, $2, $3) RETURNING *";
    const values = [appName, imageUrl, appLink];
    const result = await db.query(query, values);

    res.status(201).json({
      status: "success",
      data: {
        app: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getApps,
  uploadApp,
};
