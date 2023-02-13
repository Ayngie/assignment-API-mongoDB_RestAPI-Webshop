const express = require("express");

const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createNewCart,
  updateCartById,
  deleteCartById,
} = require("../controllers/cartController");

// Routes
// GET /api/v1/carts/ - Get all carts
router.get("/", getAllCarts);

// GET /api/v1/carts/:cartId - Get cart by id
router.get("/:cartId", getCartById);

// POST /api/v1/carts/ - Create new cart
router.post("/", createNewCart);

// PUT /api/v1/carts/:cartId - Update cart (by id)
router.put("/:cartId", updateCartById);

// DELETE /api/v1/carts/:cartId - Delete cart (by id)
router.delete("/:cartId", deleteCartById);

module.exports = router;
