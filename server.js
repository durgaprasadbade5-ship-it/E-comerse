const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

// Middleware
app.use(express.json())

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/student-db"
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error.message)
    process.exit(1)
  }
}

connectDB()

const studentRoutes = require("./routes/studentRoutes")
const productRoutes = require("./routes/productRoutes")

app.use("/students", studentRoutes)
app.use("/products", productRoutes)

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "API Server is running",
    endpoints: {
      students: "/students",
      products: "/products",
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
