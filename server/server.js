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
// const fs = require("fs");
// require("dotenv").config();

// mongoose.set('strictQuery', false);

// // ✅ MONGODB FIRST - NO CRASH/EXIT (Server survives fail)
// const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://railwayUser:Railway12345@cluster0.8kw1q9w.mongodb.net/EcommerceWebsite?retryWrites=true&w=majority";
// mongoose.connect(MONGO_URI, {
//   serverSelectionTimeoutMS: 5000,
//   connectTimeoutMS: 10000
// }).then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("⚠️ MongoDB FAILED (server continues):", err.message));  // CRITICAL: NO process.exit(1)

// mongoose.connection.on("error", (err) => console.error("❌ MongoDB Error:", err.message));
// mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB Disconnected"));

// // ✅ BULLETPROOF ROUTE LOADER
// const safeRouter = (name) => {
//   try {
//     const router = require(`./routes/${name}`);
//     return (typeof router === 'function') ? router : express.Router();
//   } catch (err) {
//     console.warn(`⚠️ Route unavailable (${name}):`, err.message);
//     return express.Router();
//   }
// };

// const productRoutes = safeRouter('productRoutes');
// const userRoutes = safeRouter('userRoutes');
// const cartRoutes = safeRouter('cartRoutes');
// const orderRoutes = safeRouter('orderRoutes');
// const adminRoutes = safeRouter('adminRoutes');
// const adminProductsRoutes = safeRouter('adminProducts');
// const adminOrdersRoutes = safeRouter('adminOrders');
// const adminStatsRoutes = safeRouter('adminStats');
// const bannerRoutes = safeRouter('bannerRoutes');
// const paymentRoutes = safeRouter('paymentRoutes');

// const app = express();

// // ✅ RAILWAY HEALTH CHECK - FIRST
// app.get('/', (req, res) => {
//   res.json({ 
//     status: 'Backend Healthy ✅', 
//     timestamp: new Date().toISOString(),
//     mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ DYNAMIC CORS - Auto Netlify
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (origin) res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
//   if (req.method === 'OPTIONS') return res.sendStatus(200);
//   next();
// });

// // ✅ STATIC DEBUG (uncomment after mkdir public/products etc.)
// console.log("📁 Static check:", {
//   products: fs.existsSync(path.join(__dirname, "public/products")),
//   banners: fs.existsSync(path.join(__dirname, "public/banners"))
// });
// // app.use("/products", express.static(path.join(__dirname, "public/products")));  // etc.

// app.get("/api/test", (req, res) => {
//   res.json({
//     message: "Backend LIVE ✅",
//     mongoConnected: mongoose.connection.readyState === 1,
//     origin: req.headers.origin
//   });
// });

// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
//     routes: { 
//       users: !!userRoutes && userRoutes.stack?.length > 0,
//       products: !!productRoutes && productRoutes.stack?.length > 0 
//     }
//   });
// });

// // ✅ MOUNT ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRoutes);
// app.use("/api/admin/orders", adminOrdersRoutes);
// app.use("/api/admin/stats", adminStatsRoutes);  // Fixed path
// app.use("/api/banners", bannerRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ 404 + ERROR HANDLERS
// app.use((req, res) => res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` }));
// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.message, err.stack);
//   res.status(500).json({ message: "Server error" });
// });

// // ✅ START SERVER
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // ✅ CRASH PROTECTION (non-fatal)
// process.on('unhandledRejection', (reason) => console.error('❌ Unhandled:', reason));
// process.on('uncaughtException', (err) => { 
//   console.error('❌ Fatal:', err); 
//   process.exit(1); 
// });


const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ ONLY HEALTH - No DB/imports that fail
app.get('/', (req, res) => res.json({status: 'Server ALIVE ✅', time: new Date().toISOString()}));
app.get('/api/health', (req, res) => res.json({status: 'healthy'}));
app.get('/api/test', (req, res) => res.json({message: 'Backend LIVE'}));

// ✅ CORS for Netlify login
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 404 last
app.use((req, res) => res.status(404).json({error: 'Not found'}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server port ${PORT}`));
