// server/routes/orderRoutes.js
const express = require("express");
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Allowed admin status values
const ALLOWED_STATUS_TYPES = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];

// ================= CUSTOMER ROUTES =================

// Place order (customer)
router.post("/", auth, async (req, res) => {
  try {
    const {
      items: rawItems,
      totalPrice,
      paymentType,
      shippingAddress,
    } = req.body;

    const items = (rawItems || []).map((item) => ({
      product: item.product || item.productId || item._id, // ensure product id
      name: item.name,
      price: item.price,
      qty: item.qty || item.quantity,
      image: item.image,
    }));

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalPrice,
      paymentType: paymentType || "COD",
      shippingAddress,
      orderStatus: [
        {
          type: "Placed",
          isCompleted: true,
          date: new Date(),
        },
      ],
    });

    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// My orders (customer)
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    console.error("My orders error:", err);
    res.status(500).json({ message: "Failed to load orders" });
  }
});

// Get single order by ID (customer)
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id, // ensure user owns the order
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Failed to load order" });
  }
});

// ================= ADMIN ROUTES =================

// Admin: all orders
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Admin get orders error:", err);
    res.status(500).json({ message: "Failed to load orders" });
  }
});

// Admin: update order status
router.put("/:id/status", auth, admin, async (req, res) => {
  try {
    const { type, note } = req.body; // "Packed", "Shipped", etc.

    if (!ALLOWED_STATUS_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid status type" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Mark previous step as completed (if not already)
    if (order.orderStatus.length > 0) {
      const last = order.orderStatus[order.orderStatus.length - 1];
      if (!last.isCompleted) last.isCompleted = true;
    }

    // Add new status step
    order.orderStatus.push({
      type,
      isCompleted: type === "Delivered" || type === "Cancelled",
      date: new Date(),
      note,
    });

    await order.save();
    res.json({ message: "Status updated", order });
  } catch (err) {
    console.error("Admin update status error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
