// Tasks controller
const db = require("../db");

// Get all tasks specific to a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.params.id,
    ]);
    return res.status(200).json({
      tasks: tasks.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

// Create bulk student tasks
exports.createTasks = async (req, res) => {
  try {
    if (req.user.user_type === "admin") {
      if (req.body.user_type === "everyone") {
        query = "SELECT user_id FROM users";
      } else if (req.body.user_type === "admin") {
        query = "SELECT user_id FROM users WHERE user_type = 'admin'";
      } else if (req.body.user_type === "student") {
        query = "SELECT user_id FROM users WHERE user_type = 'student'";
      } else {
        throw new Error("Unsupported user type");
      }

      const users = (await db.query(query)).rows;
      users.forEach(async (user) => {
        await db.query(
          "INSERT INTO tasks (task_title, task_url, user_id) VALUES ($1, $2, $3)",
          [req.body.title, req.body.url, user.user_id]
        );
      });
      return res.status(200).json({
        taskCreated: users.length,
      });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send(err.message);
  }
};
