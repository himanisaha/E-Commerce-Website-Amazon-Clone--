const express = require("express");
const Cart = require("../models/Cart");
const { auth } = require("../middleware/authMiddleware"); // ✅

const router = express.Router();

// Get cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(cart);
});

// Add to cart
router.post("/add", auth, async (req, res) => {
  const { productId, qty } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

  cart.items.push({ productId, qty });
  await cart.save();

  res.json(cart);
});

module.exports = router;
