//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//CRUD Cart:

// const Cart = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/carts/ - Get all carts
exports.getAllCarts = async (req, res, next) => {
  try {
    return res.send("Get all carts"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/v1/carts/cartId/ - Get cart by id
exports.getCartById = async (req, res, next) => {
  try {
    return res.send("Get cart by ID"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//GET cartitems in cart ???
//GET cartitem(by id) from cart ???

// POST /api/v1/carts/ - Create new cart
exports.createNewCart = async (req, res, next) => {
  try {
    return res.send("Create new cart"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// PUT /api/v1/carts/cartId/ - Update cart (by id)
exports.updateCartById = async (req, res, next) => {
  try {
    return res.send("Update cart"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/v1/carts/cartId/ - Delete cart (by id)
exports.deleteCartById = async (req, res, next) => {
  try {
    return res.send("Delete cart"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
