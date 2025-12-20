// server/routes/adminStats.js
const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats/summary", adminAuth, async (req, res) => {
  try {
    const [usersCount, ordersCount, productsCount, revenueAgg] =
      await Promise.all([
        User.countDocuments(),
        Order.countDocuments(),
        Product.countDocuments(),
        Order.aggregate([
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
      ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    res.json({ usersCount, ordersCount, productsCount, totalRevenue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
