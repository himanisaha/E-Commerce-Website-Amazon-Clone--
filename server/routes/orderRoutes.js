const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Place order
router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    items: req.body.items,
    totalPrice: req.body.totalPrice
  });
  res.json(order);
});

// Order history
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

module.exports = router;
