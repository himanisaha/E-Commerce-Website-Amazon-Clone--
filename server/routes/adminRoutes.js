const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");      // ✅ add
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Not an admin" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// NEW: ADMIN STATS
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const deliveredOrders = await Order.find({ status: "Delivered" });
    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    res.json({ totalUsers, totalOrders, totalProducts, totalRevenue });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
});

module.exports = router;
