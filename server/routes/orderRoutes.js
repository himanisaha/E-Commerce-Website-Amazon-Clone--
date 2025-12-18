const express = require("express");
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Place order (customer)
router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    items: req.body.items,
    totalPrice: req.body.totalPrice,
  });
  res.json(order);
});

// My orders (customer)
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

// Admin: all orders
router.get("/", auth, admin, async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
