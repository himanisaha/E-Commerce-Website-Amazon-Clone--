const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth, admin } = require("../middleware/authMiddleware"); // ✅

/**
 * Admin products routes
 */

// Get all products (admin)
router.get("/all", auth, admin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add product (admin)
router.post("/add", auth, admin, async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      category,
      rating,
      highlights,
      specifications,
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      category,
      rating,
      highlights,
      specifications,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update product (admin)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      category,
      rating,
      highlights,
      specifications,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
        description,
        category,
        rating,
        highlights,
        specifications,
      },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
