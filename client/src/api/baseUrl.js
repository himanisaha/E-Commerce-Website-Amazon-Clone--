// export const BASE_URL = "http://localhost:8000";
// src/api/baseUrl.js
// ✅ FIXED: Environment-aware base URL
// const baseUrl = import.meta.env.MODE === 'production'
//   ? "https://e-commerce-website-amazon-clone-production.up.railway.app"
//   : "http://localhost:8000";

// export const BASE_URL = baseUrl; 

// src/api/baseUrl.js - FIXED
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === "production" 
    ? "https://e-commerce-website-amazon-clone-production-8d74.up.railway.app"
    : "http://localhost:8000");

console.log("🚀 BASE_URL:", BASE_URL);
console.log("🚀 isDev:", import.meta.env.DEV);

export { BASE_URL };



