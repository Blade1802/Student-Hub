// Finances controller
const db = require("../db");

// Get all payments specific to a user
exports.getPayments = async (req, res) => {
  try {
    const payments = await db.query(
      "SELECT * FROM payments WHERE user_id = $1 ORDER BY payment_date DESC",
      [req.params.id]
    );
    return res.status(200).json({
      payments: payments.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
