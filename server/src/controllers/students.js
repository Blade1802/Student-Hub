const Student = require("../models/student");

// Retrieve all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students); // Send the retrieved students as a JSON response
  } catch (error) {
    console.error("Error retrieving student data:", error);
    res.status(500).send("Error retrieving student data");
  }
};

// Retrieve students based on search criteria for names or student IDs or academicUnit or location
const getStudentsBySearch = async (req, res) => {
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
    res.status(200).json({ students: students }); // Send the retrieved students as a JSON response
  } catch (error) {
    console.error("Error retrieving student data:", error);
    res.status(500).send("Error retrieving student data");
  }
};

module.exports = {
  getAllStudents,
  getStudentsBySearch,
};
