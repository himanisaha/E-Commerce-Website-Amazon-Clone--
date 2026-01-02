// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // require("dotenv").config();
// // const path = require("path");

// // // Route imports
// // const productRoutes = require("./routes/productRoutes");
// // const userRoutes = require("./routes/userRoutes");
// // const cartRoutes = require("./routes/cartRoutes");
// // const orderRoutes = require("./routes/orderRoutes");
// // const adminRoutes = require("./routes/adminRoutes");
// // const adminProductsRoutes = require("./routes/adminProducts");
// // const adminOrdersRoutes = require("./routes/adminOrders");
// // const adminStatsRoutes = require("./routes/adminStats");
// // const bannerRoutes = require("./routes/bannerRoutes");
// // const paymentRoutes = require("./routes/paymentRoutes");

// // const app = express();

// // // CORS setup (local only)
// // const allowedOrigins = [
// //   "http://localhost:5173",
// //   "http://localhost:5174",
// //   "http://localhost:5175",
// // ];

// // const corsOptions = {
// //   origin: function (origin, callback) {
// //     // allow tools like Postman (no origin) and allowed localhost origins
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("Not allowed by CORS"));
// //     }
// //   },
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization"],
// // };

// // app.use(cors(corsOptions));
// // app.use(express.json());

// // // Static folders
// // app.use("/products", express.static(path.join(__dirname, "public/products")));
// // app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// // app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// // app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// // app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // // API routes
// // app.use("/api/products", productRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/orders", orderRoutes);

// // app.use("/api/admin", adminRoutes);          // general admin routes
// // app.use("/api/admin", adminOrdersRoutes);    // admin order status routes
// // app.use("/api/admin", adminStatsRoutes);     // admin stats routes
// // app.use("/api/admin/products", adminProductsRoutes);

// // app.use("/api/banners", bannerRoutes);
// // app.use("/api/payments", paymentRoutes);

// // // Test route
// // app.get("/test", (req, res) => {
// //   res.json({ message: "Backend is working" });
// // });

// // // DB connection
// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.error(err));

// // // Server start
// // const PORT = process.env.PORT || 8000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // ✅ IMPORT ALL ROUTES
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const adminProductsRoutes = require("./routes/adminProducts");
// const adminOrdersRoutes = require("./routes/adminOrders");
// const adminStatsRoutes = require("./routes/adminStats");
// const bannerRoutes = require("./routes/bannerRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// const app = express();

// // ✅ CORS - ALLOW NETLIFY
// app.use(cors({
//   origin: ["https://ecommerce-website-amazon-clone.netlify.app", "http://localhost:5173"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ STATIC FILES
// app.use("/products", express.static(path.join(__dirname, "public/products")));
// app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // ✅ TEST ROUTES
// app.get("/test", (req, res) => {
//   res.json({ 
//     message: "Backend OK ✅",
//     mongoConnected: mongoose.connection.readyState === 1
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({ 
//     status: "healthy",
//     db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   });
// });

// // ✅ MOUNT ALL API ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRoutes);
// app.use("/api/admin/orders", adminOrdersRoutes);
// app.use("/api/admin/stats", adminStatsRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ 404 HANDLER
// app.use((req, res) => {
//   res.status(404).json({ 
//     message: `Route not found: ${req.method} ${req.originalUrl}` 
//   });
// });

// // ✅ ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({ 
//     message: "Server error",
//     error: err.message 
//   });
// });

// // ✅ MONGODB CONNECTION
// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
// })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   });

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB Runtime Error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("⚠️  MongoDB Disconnected - attempting reconnect");
// });

// // ✅ SERVER START
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Test: http://localhost:${PORT}/test`);
//   console.log(`📍 Health: http://localhost:${PORT}/health`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // ✅ IMPORT ALL ROUTES
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const adminProductsRoutes = require("./routes/adminProducts");
// const adminOrdersRoutes = require("./routes/adminOrders");
// const adminStatsRoutes = require("./routes/adminStats");
// const bannerRoutes = require("./routes/bannerRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // ✅ CORS - ALLOW NETLIFY + LOCALHOST
// // ✅ FIXED CORS
// // ✅ BULLETPROOF CORS (handles preflight correctly)
// const corsOptions = {
//   origin: [
//     "https://ecommerce-website-amazon-clone.netlify.app",
//     "http://localhost:5173"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

// // Apply CORS to all routes
// app.use(cors(corsOptions));


// // ✅ STATIC FILES
// app.use("/products", express.static(path.join(__dirname, "public/products")));
// app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // ✅ TEST ROUTES
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Backend OK ✅",
//     mongoConnected: mongoose.connection.readyState === 1
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   });
// });

// // ✅ MOUNT ALL API ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRoutes);
// app.use("/api/admin/orders", adminOrdersRoutes);
// app.use("/api/admin", adminStatsRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ 404 HANDLER
// app.use((req, res) => {
//   res.status(404).json({
//     message: `Route not found: ${req.method} ${req.originalUrl}`
//   });
// });

// // ✅ ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({
//     message: "Server error",
//     error: err.message
//   });
// });

// // ✅ BULLETPROOF MONGODB CONNECTION (VS Code FIXED)
// mongoose.connect(process.env.MONGODB_URI, {
//   serverSelectionTimeoutMS: 10000,
//   connectTimeoutMS: 10000,
//   socketTimeoutMS: 45000,
// })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   });

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB Runtime Error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("⚠️ MongoDB Disconnected - attempting reconnect");
// });

// // ✅ SERVER START
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Test: http://localhost:${PORT}/test`);
//   console.log(`📍 Health: http://localhost:${PORT}/health`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // ✅ FIX MONGOOSE STRICTQUERY
// mongoose.set('strictQuery', false);

// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const adminProductsRoutes = require("./routes/adminProducts");
// const adminOrdersRoutes = require("./routes/adminOrders");
// const adminStatsRoutes = require("./routes/adminStats");
// const bannerRoutes = require("./routes/bannerRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: [
//     "https://ecommerce-website-amazon-clone.netlify.app",    // ✅ CORRECT
//     "https://ecommerce-webiste-amazon-clone.netlify.app",    // ✅ ADD TYPO VERSION TOO
//     "http://localhost:5173",
//     "http://localhost:4173",
//     "http://localhost:3000"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };
// // // TEMP: allow all origins (only for debugging)
// // app.use(
// //   cors({
// //     origin: true,          // Reflect request origin
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );


// app.use(cors(corsOptions));

// // ✅ STATIC FILES
// app.use("/products", express.static(path.join(__dirname, "public/products")));
// app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // ✅ TEST ROUTES
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Backend OK ✅",
//     mongoConnected: mongoose.connection.readyState === 1
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   });
// });

// // ✅ MOUNT ALL API ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRoutes);
// app.use("/api/admin/orders", adminOrdersRoutes);
// app.use("/api/admin", adminStatsRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ 404 HANDLER
// app.use((req, res) => {
//   res.status(404).json({
//     message: `Route not found: ${req.method} ${req.originalUrl}`
//   });
// });

// // ✅ ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({
//     message: "Server error",
//     error: err.message
//   });
// });

// // ✅ SERVER START FIRST (NO BLOCKING)
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // ✅ MONGODB BACKGROUND (AFTER listen)
// mongoose.connect(process.env.MONGODB_URI, {
//   serverSelectionTimeoutMS: 5000,
//   connectTimeoutMS: 5000,
//   socketTimeoutMS: 20000
// }).then(async () => {  // Add async
//   console.log("✅ MongoDB Connected");
//   console.log("🔍 DB:", mongoose.connection.db.databaseName);
//   const count = await mongoose.connection.db.collection('products').countDocuments();
//   console.log("🔍 products count:", count);  // Awaited!
// })


// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB Error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("⚠️ MongoDB Disconnected");
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // ✅ FIX MONGOOSE STRICTQUERY
// mongoose.set('strictQuery', false);

// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const adminProductsRoutes = require("./routes/adminProducts");
// const adminOrdersRoutes = require("./routes/adminOrders");
// const adminStatsRoutes = require("./routes/adminStats");
// const bannerRoutes = require("./routes/bannerRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 🚨 RAILWAY CORS FIX - BEFORE ALL ROUTES
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// // ✅ STATIC FILES
// app.use("/products", express.static(path.join(__dirname, "public/products")));
// app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // ✅ TEST ROUTES
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Backend OK ✅",
//     mongoConnected: mongoose.connection.readyState === 1
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   });
// });

// // ✅ MOUNT ALL API ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRoutes);
// app.use("/api/admin/orders", adminOrdersRoutes);
// app.use("/api/admin", adminStatsRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ 404 HANDLER
// app.use((req, res) => {
//   res.status(404).json({
//     message: `Route not found: ${req.method} ${req.originalUrl}`
//   });
// });

// // ✅ ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({
//     message: "Server error",
//     error: err.message
//   });
// });

// // ✅ SERVER START FIRST (NO BLOCKING)
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // ✅ MONGODB BACKGROUND (AFTER listen)
// mongoose.connect(process.env.MONGODB_URI, {
//   serverSelectionTimeoutMS: 5000,
//   connectTimeoutMS: 5000,
//   socketTimeoutMS: 20000
// }).then(async () => {
//   console.log("✅ MongoDB Connected");
//   console.log("🔍 DB:", mongoose.connection.db.databaseName);
//   const count = await mongoose.connection.db.collection('products').countDocuments();
//   console.log("🔍 products count:", count);
// })

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB Error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("⚠️ MongoDB Disconnected");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

mongoose.set('strictQuery', false);

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminProductsRoutes = require("./routes/adminProducts");
const adminOrdersRoutes = require("./routes/adminOrders");
const adminStatsRoutes = require("./routes/adminStats");
const bannerRoutes = require("./routes/bannerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS PACKAGE (FIXED - handles credentials properly)
app.use(cors({
  origin: [
    'https://ecommerce-website-amazon-clone.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ STATIC FILES
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// ✅ TEST ROUTES (with /api prefix)
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend OK ✅",
    mongoConnected: mongoose.connection.readyState === 1
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// ✅ MOUNT ALL API ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin", adminStatsRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});

// ✅ SERVER START FIRST
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ MONGODB ASYNC (NON-BLOCKING)
mongoose.connect("mongodb+srv://railwayUser:Railway12345@cluster0.8kw1q9w.mongodb.net/EcommerceWebsite?retryWrites=true&w=majority&appName=Cluster0", {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10
}).then(async () => {
  console.log("✅ MongoDB Connected");
  console.log("🔍 DB:", mongoose.connection.db.databaseName);

  // ✅ IMMEDIATE TEST
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📦 Collections:", collections.map(c => c.name));

    const products = await mongoose.connection.db.collection('products').find({}).limit(1).toArray();
    console.log("📦 First product:", products[0]?.name || "EMPTY");
  } catch (e) {
    console.error("❌ DB test failed:", e.message);
  }

  // ✅ RETRY PRODUCTS COUNT
  const checkProducts = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
      try {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        const count = await mongoose.connection.db.collection('products').countDocuments();
        console.log(`🔍 products count (attempt ${i + 1}): ${count}`);
        if (count > 0) {
          console.log("🎉 Products ready!");
          return;
        }
      } catch (e) {
        console.log(`⚠️ Attempt ${i + 1} failed:`, e.message);
      }
    }
    console.error("❌ Products count failed");
  };

  await checkProducts();

}).catch(err => {
  console.error("❌ MongoDB Connect Failed:", err);
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});
