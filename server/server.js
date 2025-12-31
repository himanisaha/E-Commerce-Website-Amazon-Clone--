const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✅ IMPORT ALL ROUTES (MISSING!)
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

// ✅ CORS (allow Netlify)
app.use(cors({
  origin: ["https://ecommerce-website-amazon-clone.netlify.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

// ✅ STATIC FILES (for local images fallback)
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));

// ✅ ALL API ROUTES (MOUNTED!)
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

// ✅ TEST ROUTE
app.get("/test", (req, res) => res.json({ message: "Backend OK ✅" }));

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
