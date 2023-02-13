//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//CRUD cartItem:

// const CartItem = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/cartitems/ - Get all cartitems
exports.getAllCartItems = async (req, res, next) => {
  try {
    return res.send("Get all cartitems"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/v1/cartitems/cartitemId/ - Get cartitem by id
exports.getCartItemById = async (req, res, next) => {
  try {
    return res.send("Get cartitem by ID"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// POST /api/v1/cartitems/ - Create new cartitem
exports.createNewCartItem = async (req, res, next) => {
  try {
    return res.send("Create new cartitem"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// PUT /api/v1/cartitems/cartitemId/ - Update cartitem (by id)
exports.updateCartItemById = async (req, res, next) => {
  try {
    return res.send("Update cartitem"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/v1/cartitems/cartitemId/ - Delete cartitem (by id)
exports.deleteCartItemById = async (req, res, next) => {
  try {
    return res.send("Delete cartitem"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
