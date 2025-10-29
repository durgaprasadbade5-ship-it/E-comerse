const express = require("express")
const router = express.Router()
const studentController = require("../controllers/studentController")

// Create a new student
router.post("/", studentController.createStudent)

// Get all students
router.get("/", studentController.getAllStudents)

// Get a single student by ID
router.get("/:id", studentController.getStudentById)

// Update a student by ID
router.put("/:id", studentController.updateStudent)

// Delete a student by ID
router.delete("/:id", studentController.deleteStudent)

module.exports = router
