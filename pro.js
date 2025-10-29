const Product = require("../models/Product")

// Create a new product with variants
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, variants } = req.body

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Please provide all required fields: name, price, category",
      })
    }

    // Validate variants if provided
    if (variants && Array.isArray(variants)) {
      for (const variant of variants) {
        if (!variant.color || !variant.size || variant.stock === undefined) {
          return res.status(400).json({
            message: "Each variant must have color, size, and stock fields",
          })
        }
      }
    }

    // Create new product
    const product = new Product({
      name,
      price,
      category,
      variants: variants || [],
    })

    const savedProduct = await product.save()

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error creating product",
      error: error.message,
    })
  }
}

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.status(200).json({
      count: products.length,
      products,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    })
  }
}

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params

    if (!category) {
      return res.status(400).json({
        message: "Category parameter is required",
      })
    }

    const products = await Product.find({
      category: { $regex: category, $options: "i" }, // Case-insensitive search
    }).sort({ createdAt: -1 })

    if (products.length === 0) {
      return res.status(404).json({
        message: `No products found in category: ${category}`,
        products: [],
      })
    }

    res.status(200).json({
      count: products.length,
      category,
      products,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products by category",
      error: error.message,
    })
  }
}

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    })
  }
}

// Get products with variant projection (specific fields only)
exports.getProductsWithVariantProjection = async (req, res) => {
  try {
    // Project only name, category, and variants with color and size (exclude stock)
    const products = await Product.find().select("name category variants.color variants.size variants._id")

    res.status(200).json({
      count: products.length,
      message: "Products with variant details (color and size only)",
      products,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products with variant projection",
      error: error.message,
    })
  }
}

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, category, variants } = req.body

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      })
    }

    // Check if product exists
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    // Update fields if provided
    if (name) product.name = name
    if (price !== undefined) product.price = price
    if (category) product.category = category
    if (variants && Array.isArray(variants)) {
      product.variants = variants
    }

    const updatedProduct = await product.save()

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error updating product",
      error: error.message,
    })
  }
}

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    })
  }
}

// Add variant to existing product
exports.addVariant = async (req, res) => {
  try {
    const { id } = req.params
    const { color, size, stock } = req.body

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      })
    }

    // Validate variant fields
    if (!color || !size || stock === undefined) {
      return res.status(400).json({
        message: "Please provide color, size, and stock for the variant",
      })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    // Add new variant to the variants array
    product.variants.push({ color, size, stock })
    const updatedProduct = await product.save()

    res.status(200).json({
      message: "Variant added successfully",
      product: updatedProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error adding variant",
      error: error.message,
    })
  }
}

// Delete variant from product
exports.deleteVariant = async (req, res) => {
  try {
    const { id, variantId } = req.params

    // Validate MongoDB ObjectIds
    if (!id.match(/^[0-9a-fA-F]{24}$/) || !variantId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid product ID or variant ID format",
      })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    // Remove variant from array
    product.variants = product.variants.filter((variant) => variant._id.toString() !== variantId)
    const updatedProduct = await product.save()

    res.status(200).json({
      message: "Variant deleted successfully",
      product: updatedProduct,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting variant",
      error: error.message,
    })
  }
}
