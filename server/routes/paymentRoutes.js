// server/routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// Razorpay instance (must use test keys from dashboard)
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
router.post("/create-order", auth, async (req, res) => {
  try {
    const { amount } = req.body; // in rupees
    console.log("Create Razorpay order for amount:", amount);

    const options = {
      amount: Math.round(amount * 100), // rupees -> paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order.id);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay create-order error:", err);
    res
      .status(500)
      .json({ message: "Failed to create payment order" });
  }
});

// VERIFY PAYMENT + CREATE ORDER DOCUMENT
router.post("/verify-payment", auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
    } = req.body;

    const crypto = require("crypto");
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    const Order = require("../models/Order");
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = new Order({
      userId: req.user.id,
      items: cartItems,
      totalPrice: totalAmount,
      status: "Confirmed",
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Payment verified and order created",
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("verify-payment error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = router;
