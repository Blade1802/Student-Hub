const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    required: true,
    default: "Student",
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  academicUnit: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    type: String,
    required: true,
    index: true,
  },
  lastTermOfEnrollment: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
