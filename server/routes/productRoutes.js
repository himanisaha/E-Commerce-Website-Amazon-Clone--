// const express = require("express");
// const Product = require("../models/Product");
// const { auth } = require("../middleware/authMiddleware");
// const router = express.Router();

// // ✅ GET all products with filters + sorting + REVIEW COUNTS
// router.get("/", async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, minRating, sort } = req.query;

//     const filter = {};

//     if (category && category !== "all") {
//       filter.category = category;
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     if (minRating) {
//       filter.rating = { $gte: Number(minRating) };
//     }

//     // sorting
//     let sortOption = { createdAt: -1 }; // default: newest
//     if (sort === "price-asc") sortOption = { price: 1 };
//     if (sort === "price-desc") sortOption = { price: -1 };
//     if (sort === "rating-desc") sortOption = { rating: -1 };

//     const products = await Product.find(filter)
//       .sort(sortOption)
//       .limit(50)
//       .select('name price image category rating reviews') // Faster query
//       .lean();

//     // ✅ ADD numReviews TO EACH PRODUCT
//     const productsWithCounts = products.map(product => ({
//       ...product,
//       numReviews: product.reviews ? product.reviews.length : 0
//     }));

//     console.log(`✅ Found ${productsWithCounts.length} products`);
//     res.json(productsWithCounts);
//   } catch (error) {
//     console.error("Products GET error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ GET single product + CALCULATE RATING
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     // ✅ CALCULATE FROM REVIEWS (matches your POST logic)
//     const totalRating = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
//     const averageRating = product.reviews.length > 0 ? totalRating / product.reviews.length : (product.rating || 4.3);
//     const numReviews = product.reviews.length;

//     res.json({
//       ...product._doc,
//       averageRating,     // Frontend uses this
//       numReviews,        // Frontend uses this
//       rating: averageRating  // Also update rating field
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ✅ POST new product (admin)
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // ✅ Add review to product
// router.post("/:id/reviews", auth, async (req, res) => {
//   const productId = req.params.id;
//   const { rating, comment, title } = req.body;

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const review = {
//       user: req.user.id,
//       name: req.user.name,
//       title,
//       rating: Number(rating),
//       comment,
//       date: new Date().toISOString(),
//     };

//     product.reviews.push(review);

//     // ✅ UPDATE RATING
//     const total = product.reviews.reduce(
//       (sum, r) => sum + (r.rating || 0),
//       0
//     );
//     product.rating =
//       product.reviews.length > 0 ? total / product.reviews.length : 0;

//     await product.save();
//     res.status(201).json({ message: "Review added" });
//   } catch (error) {
//     console.error("Add review error:", error);
//     res.status(500).json({ message: "Failed to add review" });
//   }
// });

// // ✅ Add auth middleware
// router.post("/:id/reviews", auth, async (req, res) => {
//   const productId = req.params.id;
//   const { rating, comment, title } = req.body;

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // ✅ req.user from auth middleware
//     const review = {
//       user: req.user.id,
//       name: req.user.name,  // From JWT
//       title,
//       rating: Number(rating),
//       comment,
//       date: new Date().toISOString(),
//     };

//     product.reviews.push(review);

//     // Recalculate rating
//     const total = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
//     product.rating = product.reviews.length > 0 ? total / product.reviews.length : 0;

//     await product.save();
//     res.status(201).json({ message: "Review added" });
//   } catch (error) {
//     console.error("Add review error:", error);
//     res.status(500).json({ message: "Failed to add review" });
//   }
// });

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ GET all products with filters + sorting + REVIEW COUNTS
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, sort } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // sorting
    let sortOption = { createdAt: -1 }; // default: newest
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating-desc") sortOption = { rating: -1 };

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(50)
      .select('name price image category rating reviews')
      .lean();

    // ✅ ADD numReviews TO EACH PRODUCT
    const productsWithCounts = products.map(product => ({
      ...product,
      numReviews: product.reviews ? product.reviews.length : 127  // Amazon default
    }));

    console.log(`✅ Found ${productsWithCounts.length} products`);
    res.json(productsWithCounts);
  } catch (error) {
    console.error("Products GET error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET single product + CALCULATE RATING
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // ✅ AGGREGATE RATING FROM REVIEWS
    const totalRating = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    const averageRating = product.reviews.length > 0 
      ? totalRating / product.reviews.length 
      : (product.rating || 4.3);
    const numReviews = product.reviews.length;

    res.json({
      ...product._doc,
      averageRating,    // ✅ Frontend uses this
      numReviews,       // ✅ Frontend uses this
      rating: averageRating
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST new product (admin)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Add review to product (auth required)
router.post("/:id/reviews", auth, async (req, res) => {
  const productId = req.params.id;
  const { rating, comment, title } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      title,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };

    product.reviews.push(review);

    // ✅ UPDATE RATING (matches frontend expectation)
    const total = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    product.rating = product.reviews.length > 0 ? total / product.reviews.length : 4.3;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;
