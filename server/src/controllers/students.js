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

module.exports = {
  getAllStudents,
};
