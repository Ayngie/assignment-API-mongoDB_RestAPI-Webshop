require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

/* ------- CREATE EXPRESS APP ------- */
const app = express();

/* ------- MIDDLEWARE ------- */
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

/* ------- ROUTES ------- */
app.use("/helloWorld", (request, response) => {
  return response.send("Hello World!");
});

app.get("/api/v1/products", productRoutes);
app.get("/api/v1/carts", cartRoutes);

/*------- ERROR HANDLING -------- */

app.use(notFoundMiddleware);
app.use(errorMiddleware);

/* ------- SERVER SETUP ------- */
const port = process.env.PORT || 4000;

async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
