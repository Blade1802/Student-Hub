const db = require("../db");
const Student = require("../models/student");

const getSearchData = async (req, res) => {
  try {
    const searchQuery = req.query.query; // The search query from the request

    // Check if `searchQuery` is present
    if (!searchQuery) {
      return res.status(400).json({ message: "No search query provided" });
    }

    // Constructing search criteria to look for matches in either the name or the id
    let searchCriteria = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive regex search for names
        { id: searchQuery }, // Exact match for student ID
        { academicUnit: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
      ],
    };

    // Retrieve filtered students from the database
    const students = await Student.find(searchCriteria);

    // Retrieve filtered adminTasks from the database
    const tasks = await db.query(
      "SELECT * FROM adminTasks WHERE title ILIKE $1",
      [`%${searchQuery}%`]
    );

    res.status(200).json({
      students: students,
      tasks: tasks.rows,
    }); // Send the retrieved students as a JSON response
  } catch (error) {
    console.error("Error retrieving query data:", error);
    res.status(500).send("Error retrieving query data");
  }
};

module.exports = {
  getSearchData,
};
