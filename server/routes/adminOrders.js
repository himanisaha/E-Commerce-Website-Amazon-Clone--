// server/routes/adminOrders.js
const express = require("express");
const Order = require("../models/Order");
const { adminAuth } = require("../middleware/authMiddleware");// adjust name/path if different

const router = express.Router();


router.put("/orders/:id/status", adminAuth, async (req, res) => {
  try {
    const { status, note } = req.body;

    const allowedStatuses = [
      "Placed",
      "Packed",
      "Shipped",
      "Out for delivery",
      "Delivered",
      "Cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus.push({
      type: status,
      isCompleted: status === "Delivered" || status === "Cancelled",
      date: new Date(),
      note,
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
