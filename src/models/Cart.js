const mongoose = require("mongoose");

//vi embeddar CartItemSchema i CartSchema
//detta är ett subdocument
const CartItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//parent document
const CartSchema = new mongoose.Schema(
  {
    cartItems: {
      type: [CartItemSchema], //en array av subdocuments
    },
    totalSum: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
