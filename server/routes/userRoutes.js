const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    // Catch Mongo duplicate key error
    if (err.code === 11000 || err.keyPattern?.email) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN (keep your existing login code)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET current user profile
router.get("/me", auth, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

// ✅ UPDATE current user profile
router.put("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updated = await user.save();

    res.json({
      id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// PUT /api/users/wishlist/:productId  (toggle add/remove)
router.put("/wishlist/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.wishlist.findIndex(
      (id) => id.toString() === productId
    );

    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Failed to update wishlist" });
  }
});

// GET /api/users/wishlist  (full wishlist products)
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "wishlist",
      "name price image rating"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist); // send array of Product documents
  } catch (err) {
    res.status(500).json({ message: "Failed to load wishlist" });
  }
});


// DELETE /api/users/wishlist  (clear wishlist)
router.delete("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = [];
    await user.save();
    res.json({ message: "Wishlist cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear wishlist" });
  }
});


module.exports = router;
