const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Add product (Admin)
router.post("/product", auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Delete product
router.delete("/product/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
