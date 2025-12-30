// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");

// // Route imports
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

// // CORS setup (local only)
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:5175",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // allow tools like Postman (no origin) and allowed localhost origins
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Static folders
// app.use("/products", express.static(path.join(__dirname, "public/products")));
// app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
// app.use("/banners", express.static(path.join(__dirname, "public/banners")));
// app.use("/logos", express.static(path.join(__dirname, "public/logos")));
// app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// // API routes
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

// app.use("/api/admin", adminRoutes);          // general admin routes
// app.use("/api/admin", adminOrdersRoutes);    // admin order status routes
// app.use("/api/admin", adminStatsRoutes);     // admin stats routes
// app.use("/api/admin/products", adminProductsRoutes);

// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // Test route
// app.get("/test", (req, res) => {
//   res.json({ message: "Backend is working" });
// });

// // DB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// // Server start
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
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

// ✅ CORS - Allow Netlify
app.use(cors({
  origin: ["http://localhost:5173", "https://ecommerce-website-amazon-clone.netlify.app"],
  credentials: true
}));
app.use(express.json());

// ✅ TEST ROUTE FIRST (before all others)
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working ✅" });
});

// ✅ ROUTES - CORRECT ORDER (specific first)
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);           // ← LOGIN HERE
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ ADMIN - Specific routes FIRST
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin", adminRoutes);          // General LAST

// ✅ 404 Handler (LAST)
app.use((req, res) => {
  console.log(`🚫 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found", url: req.originalUrl });
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
