const express = require("express");
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Place order (customer)
router.post("/", auth, async (req, res) => {
  const rawItems = req.body.items || [];

  const items = rawItems.map((item) => ({
    product: item.productId || item.product || item._id,
    name: item.name,
    price: item.price,
    qty: item.qty || item.quantity,
    image: item.image, // cart must send this
  }));

  const order = await Order.create({
    userId: req.user.id,
    items,
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

// Admin: update order status
router.put("/:id/status", auth, admin, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
