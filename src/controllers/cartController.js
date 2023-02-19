const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { products } = require("../../seedDb/products");

/* --------------------------- GET /api/v1/carts - Get all carts --------------------------- */

exports.getAllCarts = async (req, res, next) => {
  const carts = await Cart.find();
  if (carts.length === 0)
    throw new NotFoundError(
      "Sorry, there is nothing to show - no carts exist!"
    );

  const totalCartsInDatabase = await Cart.countDocuments();

  return res.json({
    data: carts,
    meta: {
      total: totalCartsInDatabase,
      count: carts.length,
    },
  });
};

/* --------------------------- GET /api/v1/carts/cartId - Get cart by id --------------------------- */

exports.getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cart = await Cart.findById(cartId).populate("cartItems.product");

  if (!cart)
    throw new NotFoundError("Sorry, that cart does not exist! Try again :)");
  return res.json(cart);
};

/* --------------------------- POST /api/v1/carts - Create new cart --------------------------- */

exports.createNewCart = async (req, res, next) => {
  const newCart = await Cart.create({});

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart);
};

/* --------------------------- PUT /api/v1/carts/cartId - add Item To Cart --------------------------- */

exports.addItemToCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const pId = req.body.pId;
  let quantityToAdd = req.body.quantity || 1;
  const cart = await Cart.findById(cartId);

  if (!cart)
    throw new NotFoundError("Sorry, that cart does not exist! Try again :)");

  const cartItems = cart.cartItems;

  const existingProductIndex = cartItems.findIndex(
    (product) => product.product == pId
  );

  if (existingProductIndex > -1) {
    cartItems[existingProductIndex].quantity += quantityToAdd;
  } else {
    cartItems.push({
      product: pId,
      quantity: quantityToAdd,
    });
  }

  await cart.populate("cartItems.product");

  let totalPrice = cart.totalPrice || 0;
  cartItems.forEach((product) => {
    if (product.product._id == pId) {
      totalPrice += product.product.unitPrice * quantityToAdd;
    }
  });
  cart.totalPrice = totalPrice;

  await cart.save();

  return res.json(cart);
};

/* --------------------------- PUT /api/v1/carts/cartId/productId - delete Item From Cart --------------------------- */

exports.deleteItemFromCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const pId = req.body.pId;
  let quantityToRemove = req.body.quantity || 1;
  const cart = await Cart.findById(cartId);
  if (!cart)
    throw new NotFoundError("Sorry, that cart does not exist! Try again :)");

  let cartItems = cart.cartItems;
  await cart.populate("cartItems.product");

  const productIndex = cartItems.findIndex(
    (product) => product.product._id == pId
  );

  if (productIndex < 0)
    throw new BadRequestError("Nothing to remove, the cart is already empty!");

  if (cartItems[productIndex].quantity > quantityToRemove) {
    cartItems[productIndex].quantity -= quantityToRemove;

    let totalPrice = cart.totalPrice || 0;

    cartItems.forEach((product) => {
      if (product.product._id == pId) {
        totalPrice -= product.product.unitPrice * quantityToRemove;
      }
    });
    cart.totalPrice = totalPrice;
  } else {
    cart.totalPrice -= cartItems[productIndex].product.unitPrice;
    cartItems.splice(productIndex, 1);
  }

  await cart.save();
  const cartRes = await cart.populate("cartItems.product");
  return res.json(cartRes);
};

/* --------------------------- DELETE /api/v1/carts/cartId - Delete cart (by id) --------------------------- */

exports.deleteCartById = async (req, res, next) => {
  const cartId = req.body.cartId;

  const cartToDelete = await Cart.findById(cartId);

  if (!cartToDelete) throw new NotFoundError("This cart does not exist");
  await cartToDelete.delete();
  return res.sendStatus(204);
};
