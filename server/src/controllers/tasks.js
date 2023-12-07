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
  }
};
