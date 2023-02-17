const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { products } = require("../../seedDb/products");

/* --------------------------- GET /api/v1/carts - Get all carts --------------------------- */

exports.getAllCarts = async (req, res, next) => {
  const carts = await Cart.find();
  if (carts.length === 0)
    throw new NotFoundError("Sorry, no shopping carts exist!");

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
    throw new NotFoundError(
      "Sorry, that shoppingcart does not exist! Try again :)"
    );
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
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const cartId = req.params.cartId;
  if (productId.length != 24 || cartId.length != 24) {
    return res.status(400).send("ID must be a string of 24  hex characters");
  }

  try {
    if (!productId && quantity) {
      return res.status(400).json({
        message: "You must provide a productID and quantity to update",
      });
    }

    let cartToUpdate = await Cart.findById(cartId);

    let productDetails = await Product.findById(productId);

    if (!productDetails) {
      return res.status(400).send("That product does not exist");
    }

    if (!cartToUpdate) return res.status(400).send("That cart does not exist");

    const productInCart = cartToUpdate.cartItems.find(
      ({ product }) => product == productId
    );

    if (productInCart) {
      productInCart.quantity += quantity;
      productInCart.totalItemPrice +=
        productDetails.unitPrice * productInCart.quantity;
      console.log(productInCart.product.unitPrice);
      if (productInCart.quantity <= 0) {
        let listindex = cartToUpdate.cartItems.indexOf(productInCart);
        cartToUpdate.cartItems.splice(listindex, 1);
      }
    }

    if (!productInCart && quantity > 0) {
      const newCartItem = {
        product: productId,
        quantity: quantity,
        totalItemPrice: Number(productDetails.unitPrice * quantity),
      };
      cartToUpdate.cartItems.push(newCartItem);
    }

    let sum = 0;

    for (let x of cartToUpdate.cartItems) {
      sum += x.totalItemPrice;
    }

    cartToUpdate.totalprice = sum;

    const updatedCart = await cartToUpdate.save();

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};

/* --------------------------- PUT /api/v1/carts/cartId/productId - delete Item From Cart --------------------------- */

exports.deleteItemFromCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  if (productId.length != 24 || cartId.length != 24) {
    return res.status(400).send("Id must be a string of 24 characters");
  }

  try {
    let cartToUpdate = await Cart.findById(cartId);

    const productInCart = cartToUpdate.cartItems.find(
      ({ product }) => product == productId
    );

    let listindex = cartToUpdate.cartItems.indexOf(productInCart);
    cartToUpdate.cartItems.splice(listindex, 1);

    let sum = 0;

    for (let x of cartToUpdate.cartItems) {
      sum += x.totalItemPrice;
    }

    cartToUpdate.totalprice = sum;

    const updatedCart = await cartToUpdate.save();

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

/* --------------------------- DELETE /api/v1/carts/cartId - Delete cart (by id) --------------------------- */

exports.deleteCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  if (cartId.length != 24) {
    return res.status(400).send("Id must be a string of 24 hex characters");
  }

  const cartToDelete = await Cart.findById(cartId);

  if (!cartToDelete) throw new NotFoundError("This cart does not exist");
  await cartToDelete.delete();
  return res.sendStatus(204);
};
