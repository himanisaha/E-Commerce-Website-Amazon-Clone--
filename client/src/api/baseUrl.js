// export const BASE_URL = "http://localhost:8000";
// src/api/baseUrl.js
// ✅ FIXED: Environment-aware base URL
const baseUrl = import.meta.env.MODE === 'production'
  ? "https://e-commerce-website-amazon-clone-production.up.railway.app"
  : "http://localhost:8000";

export default baseUrl;



