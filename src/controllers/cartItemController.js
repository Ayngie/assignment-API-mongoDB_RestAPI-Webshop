//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//CRUD cartItem:

const CartItem = require("../models/Cart");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/cartitems/ - Get all cartitems
exports.getAllCartItems = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);

  const offset = Number(req.query?.offset || 0);

  const cartItems = await CartItem.find().limit(limit).skip(offset);
  const totalCartItemsInDatabase = await CartItem.countDocuments();

  return res.json({
    data: cartItems,
    meta: {
      total: totalCartItemsInDatabase,
      limit: limit,
      offset: offset,
      count: cartItems.length,
    },
  });
};

// GET /api/v1/cartitems/cartitemId/ - Get cartitem by id
exports.getCartItemById = async (req, res, next) => {
  const cartItemId = req.params.cartItemId;

  const cartItem = await CartItem.findById(cartItemId);

  if (!cartItem) throw new NotFoundError("This cartItem does not exist");
  return res.json(cartItem);
};

// POST /api/v1/cartitems/ - Create new cartitem
// exports.createNewCartItem = async (req, res, next) => {
//   //args
//   const cartId = req.params.cartId;
//   const productId = req.params.productId;

//   const name = req.body.name;
//   const unitPrice = req.body.unitPrice;
//   const quantity = req.body.quantity;

//   //check args / params input
//   if (!cartId) throw new BadRequestError("You must provide a cartId");
//   if (!productId) throw new BadRequestError("You must provide a productId");

//   //check so cart exists
//   const shoppingCartExists = await Cart.findById(cartId);
//   if (!shoppingCartExists)
//     throw new NotFoundError(
//       "Sorry, there's been a mistake - that shoppingcart does not exist."
//     );

//   //check so product exists
//   const productExists = await Product.findById(productId);
//   if (!productExists)
//     throw new NotFoundError(
//       "Sorry, there's been a mistake - that product does not exist."
//     );

//     //check cart for item
//   let itemInCartExists = false;
//   for (let cartItem of shoppingCartExists.cartItems) {
//     if (cartItem.id === productId) {
//       cartItem.quantity++;
//       itemInCartExists = true;
//     }
//   }

//   if (!itemInCartExists) {
//     const productFilePath = path.join(
//       productsDirectory,
//       `${productId}.json`
//     );

//     const productExists = await fileExists(productFilePath);
//     if (!productExists)
//       return new GraphQLError(
//         "Sorry, that product doesn't exist in our directory."
//       );

//     const productToAdd = await readJsonFile(productFilePath);

//     const newCartItem = {
//       id: productToAdd.id,
//       name: productToAdd.name,
//       unitPrice: productToAdd.unitPrice,
//       quantity: 1,
//     };

//     shoppingCartToUpdate.itemsInCart.push(newCartItem);
//   }

//   const newCartItem = await CartItem.create({
//     name: name,
//     unitPrice: unitPrice,
//     quantity: quantity,
//   });

//   return res

//     .setHeader(
//       "Location",
//       `http://localhost:${process.env.PORT}/api/v1/cartItems/${newCartItem._id}`
//     )
//     .status(201)
//     .json(newCartItem);
// };

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
