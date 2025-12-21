const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

//  Route imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminProductsRoutes = require("./routes/adminProducts");
const adminOrdersRoutes = require("./routes/adminOrders");
const adminStatsRoutes = require("./routes/adminStats"); // ✅ new
const bannerRoutes = require("./routes/bannerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middlewares
// Middlewares
const allowedOrigins = [
  "https://ecommerce-website-amazon-clone.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());


//  Static folders
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));

// 🔹 API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);        // general admin routes
app.use("/api/admin", adminOrdersRoutes);  // admin order status routes
app.use("/api/admin", adminStatsRoutes);   // ✅ admin stats routes
app.use("/api/admin/products", adminProductsRoutes);

app.use("/api/banners", bannerRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
