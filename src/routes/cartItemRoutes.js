const express = require("express");

const router = express.Router();
const {
  getAllCartItems,
  getCartItemById,
  createNewCartItem,
  updateCartItemById,
  deleteCartItemById,
} = require("../controllers/cartItemController");

// Routes
// GET /api/v1/cartitems/ - Get all cartitems
router.get("/", getAllCartItems);

// GET /api/v1/cartitems/:cartitemId - Get cartitem by id
router.get("/:cartitemId", getCartItemById);

// POST /api/v1/cartitems/ - Create new cartitem
router.post("/", createNewCartItem);

// PUT /api/v1/cartitems/:cartitemId - Update cartitem (by id)
router.put("/:cartitemId", updateCartItemById);

// DELETE /api/v1/cartitems/:cartitemId/ - Delete cartitem (by id)
router.delete("/:cartitemId", deleteCartItemById);

module.exports = router;
