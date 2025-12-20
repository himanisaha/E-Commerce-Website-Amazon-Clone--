const express = require("express");
const Product = require("../models/Product");
const { auth } = require("../middleware/authMiddleware"); // ✅ add this
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ NEW: add review to a product
router.post("/:id/reviews", auth, async (req, res) => {
  const productId = req.params.id;
  const { rating, comment, title } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      user: req.user.id,          // requires authMiddleware to set req.user
      name: req.user.name,        // or req.user.email if you store that
      title,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };

    product.reviews.push(review);

    const total = product.reviews.reduce(
      (sum, r) => sum + (r.rating || 0),
      0
    );
    product.rating =
      product.reviews.length > 0 ? total / product.reviews.length : 0;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;
