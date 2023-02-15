//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//CRUD Cart:

const Cart = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/carts/ - Get all carts
exports.getAllCarts = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);

  const offset = Number(req.query?.offset || 0);

  const carts = await Cart.find().limit(limit).skip(offset);
  const totalCartsInDatabase = await Cart.countDocuments();

  return res.json({
    data: carts,
    meta: {
      total: totalCartsInDatabase,
      limit: limit,
      offset: offset,
      count: carts.length,
    },
  });
};

// GET /api/v1/carts/cartId/ - Get cart by id
exports.getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cart = await Cart.findById(cartId);

  if (!cart)
    throw new NotFoundError(
      "Sorry, that shoppingcart does not exist! Try again :)"
    );
  return res.json(cart);
};

//GET cartitems in cart ???
//GET cartitem(by id) from cart ???

// POST /api/v1/carts/ - Create new cart
exports.createNewCart = async (req, res, next) => {
  const cartItems = req.body.cartItems;
  const totalSum = req.body.totalSum;

  const newCart = await Cart.create({
    cartItems: cartItems || [],
    totalSum: totalSum,
  });

  return res

    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart);
};

// PUT /api/v1/carts/cartId/ - Update cart (by id)
// exports.updateCartById = async (req, res, next) => {
//   const cartId = req.params.cartId;

//   const { cartItems, totalSum } = req.body;

//   if (!cartItems)
//     throw new BadRequestError(
//       "You must add/remove a cartItem to update the cart"
//     );

//   const cartToUpdate = await Cart.findById(cartId);

//   if (!cartToUpdate)
//     throw new NotFoundError(
//       "This cart does not exist, please provide the correct id"
//     );

//   if (cartItems) cartToUpdate.cartItems = cartItems;
//   if (totalSum) cartToUpdate.totalSum = totalSum;
//   const updatedCart = await cartToUpdate.save();

//   return res.json(updatedCart);
// };

// DELETE /api/v1/carts/cartId/ - Delete cart (by id)
exports.deleteCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cartToDelete = await Cart.findById(cartId);

  if (!cartToDelete) throw new NotFoundError("This cart does not exist");
  await cartToDelete.delete();
  return res.sendStatus(204);
};
