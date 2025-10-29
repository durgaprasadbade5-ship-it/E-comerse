const Student = require("../models/Student")

exports.createStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body

    // Validation
    if (!name || !age || !course) {
      return res.status(400).json({
        message: "Please provide all required fields: name, age, course",
      })
    }

    // Create new student
    const student = new Student({
      name,
      age,
      course,
    })

    // Save to database
    const savedStudent = await student.save()

    res.status(201).json({
      message: "Student created successfully",
      student: savedStudent,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error creating student",
      error: error.message,
    })
  }
}

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })

    res.status(200).json({
      count: students.length,
      students,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    })
  }
}

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid student ID format",
      })
    }

    const student = await Student.findById(id)

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      })
    }

    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    })
  }
}

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { name, age, course } = req.body

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid student ID format",
      })
    }

    // Check if student exists
    const student = await Student.findById(id)
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      })
    }

    // Update fields if provided
    if (name) student.name = name
    if (age) student.age = age
    if (course) student.course = course

    const updatedStudent = await student.save()

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error updating student",
      error: error.message,
    })
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid student ID format",
      })
    }

    const student = await Student.findByIdAndDelete(id)

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      })
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    })
  }
}
