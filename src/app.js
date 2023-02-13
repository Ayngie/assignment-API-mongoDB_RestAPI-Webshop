require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const {
  getAllProducts,
  getProductById,
} = require("./controllers/productController");
const {
  getAllCarts,
  getCartById,
  createNewCart,
  updateCartById,
  deleteCartById,
} = require("./controllers/cartController");
const {
  getAllCartItems,
  getCartItemById,
  createNewCartItem,
  updateCartItemById,
  deleteCartItemById,
} = require("./controllers/cartItemController");

const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  // when above code executed; go on to next middleware/routing
  next();
});

app.use("/helloWorld", (request, response) => {
  return response.send("Hello World!");
});

app.get("/api/v1/products", getAllProducts);
app.get("/api/v1/products/:productId", getProductById);

app.get("/api/v1/carts", getAllCarts);
app.get("/api/v1/carts/:cartId", getCartById);
app.get("/", createNewCart);
app.get("/api/v1/carts/:cartId", updateCartById);
app.get("/api/v1/carts/:cartId", deleteCartById);

app.get("/api/v1/cartitems", getAllCartItems);
app.get("/api/v1/cartitems/:cartitemId", getCartItemById);
app.get("/", createNewCartItem);
app.get("/api/v1/cartitems/:cartitemId", updateCartItemById);
app.get("/api/v1/cartitems/:cartitemId", deleteCartItemById);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
