// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Auth: verify token and attach user (non‑admin & admin)
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user without password
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found for token" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin check: only allow isAdmin users (for routes that call both auth + admin)
const admin = (req, res, next) => {
  console.log(
    "admin check user =",
    req.user && req.user.email,
    "isAdmin =",
    req.user && req.user.isAdmin
  );

  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

// Standalone adminAuth (used directly in adminOrders.js)
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Admin access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { auth, admin, adminAuth };
