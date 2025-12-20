const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const { auth } = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
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

// LOGIN
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

// UPDATE current user profile
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

// ✅ CHANGE PASSWORD (logged-in user)
router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both passwords are required" });
  }

  const user = await User.findById(req.user.id).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  // if you don't have user.matchPassword, use bcrypt.compare here
  const isMatch = await user.matchPassword
    ? user.matchPassword(currentPassword)
    : bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Current password is incorrect" });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
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

// ================== FORGOT / RESET PASSWORD ==================

// POST /api/users/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    // Always respond the same, even if user not found (security)
    if (!user) {
      return res.json({
        message: "If an account exists, a reset link has been sent",
      });
    }

    // Remove any existing reset tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id });

    // Generate random token
    const token = crypto.randomBytes(32).toString("hex");
    const hashed = await bcrypt.hash(token, 10);

    await PasswordResetToken.create({
      userId: user._id,
      token: hashed,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

    await sendEmail(
      user.email,
      "Reset your password",
      `Click the link below to reset your password (valid for 15 minutes):\n\n${resetLink}`
    );

    return res.json({
      message: "If an account exists, a reset link has been sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/users/reset-password/:userId/:token
router.post("/reset-password/:userId/:token", async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const resetDoc = await PasswordResetToken.findOne({ userId });
    if (!resetDoc)
      return res
        .status(400)
        .json({ message: "Invalid or expired reset link" });

    if (resetDoc.expiresAt < new Date()) {
      await PasswordResetToken.deleteMany({ userId });
      return res
        .status(400)
        .json({ message: "Reset link has expired" });
    }

    const isValid = await bcrypt.compare(token, resetDoc.token);
    if (!isValid)
      return res
        .status(400)
        .json({ message: "Invalid or expired reset link" });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // IMPORTANT: plain password, let pre-save hook hash it
    user.password = password;
    await user.save();

    await PasswordResetToken.deleteMany({ userId });

    return res.json({
      message: "Password reset successful. Please log in.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ CHANGE PASSWORD (logged-in user)
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both current and new password are required" });
    }

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Support either custom matchPassword or direct bcrypt.compare
    const isMatch = user.matchPassword
      ? await user.matchPassword(currentPassword)
      : await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect" });
    }

    // Assign plain new password; pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
