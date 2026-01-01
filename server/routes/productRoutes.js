// // const express = require("express");
// // const Product = require("../models/Product");
// // const { auth } = require("../middleware/authMiddleware");
// // const router = express.Router();

// // // GET all products with filters + sorting
// // router.get("/", async (req, res) => {
// //   try {
// //     const { category, minPrice, maxPrice, minRating, sort } = req.query;

// //     const filter = {};

// //     if (category && category !== "all") {
// //       filter.category = category;
// //     }

// //     if (minPrice || maxPrice) {
// //       filter.price = {};
// //       if (minPrice) filter.price.$gte = Number(minPrice);
// //       if (maxPrice) filter.price.$lte = Number(maxPrice);
// //     }

// //     if (minRating) {
// //       filter.rating = { $gte: Number(minRating) };
// //     }


// //     // sorting
// //     let sortOption = { createdAt: -1 }; // default: newest
// //     if (sort === "price-asc") sortOption = { price: 1 };
// //     if (sort === "price-desc") sortOption = { price: -1 };
// //     if (sort === "rating-desc") sortOption = { rating: -1 };

// //     const products = await Product.find(filter).sort(sortOption).limit(50);
// //     console.log(`✅ Found ${products.length} products (limited to 50)`);
// //     res.json(products);
// //   } catch (error) {

// //     console.error("Products GET error:", error);
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // GET single product by ID
// // router.get("/:id", async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product)
// //       return res.status(404).json({ message: "Product not found" });
// //     res.json(product);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // POST new product
// // router.post("/", async (req, res) => {
// //   try {
// //     const product = new Product(req.body);
// //     const savedProduct = await product.save();
// //     res.status(201).json(savedProduct);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // add review to a product
// // router.post("/:id/reviews", auth, async (req, res) => {
// //   const productId = req.params.id;
// //   const { rating, comment, title } = req.body;

// //   try {
// //     const product = await Product.findById(productId);
// //     if (!product) {
// //       return res.status(404).json({ message: "Product not found" });
// //     }

// //     const review = {
// //       user: req.user.id,
// //       name: req.user.name,
// //       title,
// //       rating: Number(rating),
// //       comment,
// //       date: new Date().toISOString(),
// //     };

// //     product.reviews.push(review);

// //     const total = product.reviews.reduce(
// //       (sum, r) => sum + (r.rating || 0),
// //       0
// //     );
// //     product.rating =
// //       product.reviews.length > 0 ? total / product.reviews.length : 0;

// //     await product.save();
// //     res.status(201).json({ message: "Review added" });
// //   } catch (error) {
// //     console.error("Add review error:", error);
// //     res.status(500).json({ message: "Failed to add review" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const Product = require("../models/Product");
// const { auth } = require("../middleware/authMiddleware");
// const router = express.Router();


// // GET all products with filters + sorting
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

//     const products = await Product.find(filter).sort(sortOption).limit(50);
//     console.log(`✅ Found ${products.length} products (limited to 50)`);
//     res.json(products);
//   } catch (error) {
//     console.error("Products GET error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).limit(1);  // ✅ CHANGED THIS LINE ONLY
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST new product
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // add review to a product
// router.post("/:id/reviews", auth, async (req, res) => {
//   const productId = req.params.id;
//   const { rating, comment, title } = req.body;

//   try {
//     const product = await Product.findById(productId).limit(1);  // ✅ CHANGED THIS LINE ONLY
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

// module.exports = router;
//  const express = require("express");
// const Product = require("../models/Product");
// const { auth } = require("../middleware/authMiddleware");
// const router = express.Router();

// // ✅ GET all products - TIMEOUT + LEAN
// router.get("/", async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, minRating, sort } = req.query;
//     const filter = {};

//     if (category && category !== "all") filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }
//     if (minRating) filter.rating = { $gte: Number(minRating) };

//     let sortOption = { createdAt: -1 };
//     if (sort === "price-asc") sortOption = { price: 1 };
//     if (sort === "price-desc") sortOption = { price: -1 };
//     if (sort === "rating-desc") sortOption = { rating: -1 };

//     const products = await Product.find(filter)
//       .maxTimeMS(5000)  // ✅ 5s timeout
//       .sort(sortOption)
//       .limit(50)
//       .lean();  // ✅ Faster JSON
//     console.log(`✅ Found ${products.length} products`, filter);
//     res.json(products);
//   } catch (error) {
//     console.error("Products GET error:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Single product
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .maxTimeMS(5000)
//       .lean();
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
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

// // ✅ Add review
// router.post("/:id/reviews", auth, async (req, res) => {
//   const { rating, comment, title } = req.body;
//   try {
//     const product = await Product.findById(req.params.id).maxTimeMS(5000);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const review = {
//       user: req.user.id,
//       name: req.user.name,
//       title, rating: Number(rating), comment, date: new Date().toISOString()
//     };
//     product.reviews.push(review);

//     const total = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
//     product.rating = product.reviews.length > 0 ? total / product.reviews.length : 0;
//     await product.save();
//     res.status(201).json({ message: "Review added" });
//   } catch (error) {
//     console.error("Review error:", error);
//     res.status(500).json({ message: "Failed to add review" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const Product = require("../models/Product");
// const { auth } = require("../middleware/authMiddleware");
// const router = express.Router();

// // ✅ GET products - BULLETPROOF TIMEOUT
// router.get("/", async (req, res) => {
//   try {
//     console.log("🔍 Products query:", req.query); // DEBUG filter

//     const { category, minPrice, maxPrice, minRating, sort } = req.query;
//     const filter = { active: true }; // ✅ Only active products

//     if (category && category !== "all") filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }
//     if (minRating) filter.rating = { $gte: Number(minRating) };

//     let sortOption = { createdAt: -1 };
//     if (sort === "price-asc") sortOption = { price: 1 };
//     if (sort === "price-desc") sortOption = { price: -1 };
//     if (sort === "rating-desc") sortOption = { rating: -1 };

//     const products = await Product.find(filter)
//       .maxTimeMS(3000)  // ✅ 3s timeout
//       .sort(sortOption)
//       .limit(24)  // ✅ Smaller limit
//       .lean();    // ✅ Faster
//     console.log(`✅ ${products.length} products found`);
//     res.json(products);
//   } catch (error) {
//     console.error("❌ Products error:", error.message);
//     res.status(500).json({ message: "Server error - try again" });
//   }
// });

// // ✅ Single product
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .maxTimeMS(3000)
//       .lean();
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Product not found" });
//   }
// });

// // ✅ Admin POST
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product({ ...req.body, active: true });
//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // ✅ Reviews
// router.post("/:id/reviews", auth, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).maxTimeMS(3000);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const review = {
//       user: req.user.id, name: req.user.name,
//       title: req.body.title, rating: Number(req.body.rating),
//       comment: req.body.comment, date: new Date().toISOString()
//     };
//     product.reviews.push(review);

//     product.rating = product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / product.reviews.length;
//     await product.save();
//     res.json({ message: "Review added" });
//   } catch (error) {
//     res.status(500).json({ message: "Review failed" });
//   }
// });

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// ✅ GET ALL PRODUCTS - NO FILTER!
router.get("/", async (req, res) => {
  try {
    console.log("🔍 Query filters:", req.query);
    
    const { category, minPrice, maxPrice, minRating, sort } = req.query;
    const filter = {};

    // Apply filters ONLY if provided
    if (category && category !== "all") filter.category = category;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (minRating) filter.rating = { $gte: Number(minRating) };

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating-desc") sortOption = { rating: -1 };

    // ✅ DEBUG: Count total docs
    console.log("🔍 Total DB docs:", await Product.countDocuments());
    console.log("🔍 Applied filter:", filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .maxTimeMS(10000)
      .limit(50)
      .lean();

    console.log(`✅ Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.json([]);
  }
});


// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).maxTimeMS(5000).lean();
    res.json(product || { error: "Not found" });
  } catch (error) {
    res.json({ error: "Not found" });
  }
});

// ✅ ADMIN POST (for new products)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
