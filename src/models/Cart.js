const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    cartItems: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
