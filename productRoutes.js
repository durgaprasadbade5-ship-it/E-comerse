const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

// Create a new product
router.post("/", productController.createProduct)

// Get all products
router.get("/", productController.getAllProducts)

// Get products with variant projection (specific fields only)
router.get("/projection/variants", productController.getProductsWithVariantProjection)

// Get products by category
router.get("/category/:category", productController.getProductsByCategory)

// Get a single product by ID
router.get("/:id", productController.getProductById)

// Update a product by ID
router.put("/:id", productController.updateProduct)

// Add variant to product
router.post("/:id/variants", productController.addVariant)

// Delete variant from product
router.delete("/:id/variants/:variantId", productController.deleteVariant)

// Delete a product by ID
router.delete("/:id", productController.deleteProduct)

module.exports = router
