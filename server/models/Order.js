// server/models/Order.js
const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Placed",
        "Packed",
        "Shipped",
        "Out for delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    note: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentType: { type: String, default: "COD" },

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
    },

    orderStatus: [orderStatusSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
