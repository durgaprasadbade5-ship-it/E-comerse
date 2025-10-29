const mongoose = require("mongoose")

const variantSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: [true, "Variant color is required"],
      trim: true,
      minlength: [2, "Color must be at least 2 characters long"],
      maxlength: [50, "Color cannot exceed 50 characters"],
    },
    size: {
      type: String,
      required: [true, "Variant size is required"],
      trim: true,
      minlength: [1, "Size must be at least 1 character long"],
      maxlength: [20, "Size cannot exceed 20 characters"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  {
    _id: true, // Each variant gets its own ObjectId
  },
)

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters long"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: (value) => value >= 0,
        message: "Price must be a positive number",
      },
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters long"],
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
