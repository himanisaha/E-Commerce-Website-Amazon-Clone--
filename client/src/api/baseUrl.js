// export const BASE_URL = "http://localhost:8000";
// src/api/baseUrl.js
const isDev = import.meta.env.DEV && window.location.hostname === 'localhost';
export const BASE_URL = isDev 
  ? "http://localhost:8000" 
  : "https://e-commerce-website-amazon-clone-production.up.railway.app";


 