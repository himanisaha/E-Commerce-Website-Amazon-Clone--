// const express = require("express");
// const Cart = require("../models/Cart");
// const { auth } = require("../middleware/authMiddleware"); 

// const router = express.Router();

// // Get cart
// router.get("/", auth, async (req, res) => {
//   const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//   res.json(cart);
// });

// // Add to cart
// router.post("/add", auth, async (req, res) => {
//   const { productId, qty } = req.body;

//   let cart = await Cart.findOne({ userId: req.user.id });
//   if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

//   cart.items.push({ productId, qty });
//   await cart.save();

//   res.json(cart);
// });

// module.exports = router;

const express = require("express");
const Cart = require("../models/Cart");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// Get cart
router.get("/", auth, async (req, res) => {
  try {
    // ⚡ ADD TIMEOUT
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId")
      .maxTimeMS(5000);

    console.log(`✅ Cart fetched for user ${req.user.id}`);
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    console.error("❌ Get cart error:", error.message);
    res.status(500).json({ message: "Failed to get cart" });
  }
});

// Add to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, qty } = req.body;

    // ⚡ ADD TIMEOUT
    let cart = await Cart.findOne({ userId: req.user.id })
      .maxTimeMS(5000);

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    cart.items.push({ productId, qty });
    await cart.save();

    console.log(`✅ Product added to cart for user ${req.user.id}`);
    res.json(cart);
  } catch (error) {
    console.error("❌ Add to cart error:", error.message);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

module.exports = router;
