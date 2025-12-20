const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// 🔹 Route imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Static folders
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));


// 🔹 API routes (THIS IS WHERE YOUR CODE GOES ✅)
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", require("./routes/adminProducts")); 
app.use("/api/banners", bannerRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

//  DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
