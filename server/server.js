const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✅ ROUTE IMPORTS
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

// ✅ CORS - ALLOW ALL ORIGINS + CREDENTIALS
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false // Set to false when origin is "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ STATIC FILES
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// ✅ TEST ROUTE
app.get("/test", (req, res) => {
  res.json({ message: "Backend OK ✅", timestamp: new Date() });
});

// ✅ API ROUTES
try {
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/admin/products", adminProductsRoutes);
  app.use("/api/admin/orders", adminOrdersRoutes);
  app.use("/api/admin/stats", adminStatsRoutes);
  app.use("/api/banners", bannerRoutes);
  app.use("/api/payments", paymentRoutes);
} catch (err) {
  console.error("❌ Route mounting error:", err);
}

// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
});

// ✅ MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/test`);
});
