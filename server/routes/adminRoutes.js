// // server/routes/adminRoutes.js
// const express = require("express");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const { adminAuth } = require("../middleware/authMiddleware");

// const router = express.Router();

// // ADMIN LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user || !user.isAdmin) {
//       return res.status(401).json({ message: "Not an admin" });
//     }

//     // NOTE: for real projects use bcrypt; here you are comparing plain text
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "1d" }
//     );

//     res.json({ token, user });
//   } catch (error) {
//     console.error("Admin login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ADMIN: GET ALL USERS (no passwords)
// router.get("/users", adminAuth, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     console.error("Admin users error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// server/routes/adminRoutes.js
const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const { adminAuth } = require("../middleware/authMiddleware");

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
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: GET ALL USERS (no passwords)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Admin users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADD THIS: ADMIN DASHBOARD STATS
// ✅ ADMIN DASHBOARD STATS (FIXED for totalPrice + status array)
router.get("/stats/summary", adminAuth, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();

    // ✅ Use totalPrice field + all orders revenue
    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      usersCount,
      ordersCount,
      productsCount,
      totalRevenue,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

module.exports = router;
