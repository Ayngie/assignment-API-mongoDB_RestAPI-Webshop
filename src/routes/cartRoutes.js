const express = require("express");

const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createNewCart,
  addItemToCart,
  deleteItemFromCart,
  deleteCartById,
} = require("../controllers/cartController");

// Routes
// GET /api/v1/carts - Get all carts
router.get("/", getAllCarts);

// GET /api/v1/carts/:cartId - Get cart by id
router.get("/:cartId", getCartById);

// POST /api/v1/carts - Create new cart
router.post("/", createNewCart);

// PUT /api/v1/carts/cartId - add Item To Cart
router.put("/:cartId", addItemToCart);

// PUT /api/v1/carts/cartId/productId - delete Item From Cart
router.delete("/:cartId/:productId", deleteItemFromCart);

// DELETE /api/v1/carts/cartId - Delete cart (by id)
router.delete("/:cartId", deleteCartById);

module.exports = router;
