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

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✅ IMPORT ALL ROUTES
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
// ✅ CORS - ALLOW NETLIFY + LOCALHOST
// ✅ FIXED CORS
// ✅ BULLETPROOF CORS (handles preflight correctly)
const corsOptions = {
  origin: [
    "https://ecommerce-website-amazon-clone.netlify.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS to all routes
app.use(cors(corsOptions));


// ✅ STATIC FILES
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// ✅ TEST ROUTES
app.get("/test", (req, res) => {
  res.json({
    message: "Backend OK ✅",
    mongoConnected: mongoose.connection.readyState === 1
  });
});

app.get("/health", (req, res) => {
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

// ✅ BULLETPROOF MONGODB CONNECTION (VS Code FIXED)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Runtime Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected - attempting reconnect");
});

// ✅ SERVER START
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/test`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
});
