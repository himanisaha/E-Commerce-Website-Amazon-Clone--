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
const path = require("path");  // ✅ Added
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());  // ✅ Only ONE

// ✅ STATIC FILES
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/banners", express.static(path.join(__dirname, "public/banners")));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/icons", express.static(path.join(__dirname, "public/icons")));
app.use("/ratings", express.static(path.join(__dirname, "public/ratings")));

// ✅ TEST
app.get("/test", (req, res) => res.json({ message: "Backend OK ✅" }));

// ✅ LOGIN
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  res.json({ 
    success: true, 
    message: `Login ${email}`, 
    token: "fake-jwt-for-testing",
    user: { email, name: "Test User" }
  });
});

// ✅ REGISTER
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;
  res.status(201).json({ id: "test123", name, email });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
