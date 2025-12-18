const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Auth: verify token and attach user
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin check: only allow isAdmin users
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

module.exports = { auth, admin };
