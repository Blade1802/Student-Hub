const db = require("../db");

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

exports.createTasks = async (req, res) => {
  try {
    if (req.user.user_type === "admin") {
      const users = (
        await db.query("SELECT user_id FROM users WHERE user_type = $1", [
          "student",
        ])
      ).rows;
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