const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// Routes
// GET /api/v1/products - Get all products
router.get("/", getAllProducts);

// GET /api/v1/products/productId - Get product by id
router.get("/:productId", getProductById);

module.exports = router;
