const db = require("../db");

const getApps = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT a.* FROM apps a JOIN users u ON a.user_id = u.user_id WHERE u.user_type = 'admin' OR a.user_id = $1 ORDER BY user_id",
      [req.user.user_id]
    );
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
      "INSERT INTO apps(name, image_url, app_link, user_id) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [appName, imageUrl, appLink, req.user.user_id];
    const result = await db.query(query, values);

    res.status(201).json({
      app: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Function to delete an app by ID
const deleteApp = async (req, res) => {
  const { appId } = req.params;

  try {
    const deleteQuery = "DELETE FROM apps WHERE id = $1 RETURNING *";
    const result = await db.query(deleteQuery, [appId]);

    if (result.rows.length === 0) {
      // No rows were returned, which means there was no record to delete
      return res.status(404).json({ message: "App not found" });
    }

    res.status(200).json({
      status: "success",
      message: "App deleted successfully",
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
  deleteApp,
};
