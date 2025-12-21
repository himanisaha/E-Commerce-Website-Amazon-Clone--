import React from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function RatingStars({ rating = 0, size = 80 }) {
  // Convert 0–5 → nearest multiple of 10 (0–50)
  const roundedRating = Math.round(rating * 2) * 5;

  const imagePath = `${API_BASE_URL}/ratings/rating-${roundedRating}.png`;

  return (
    <img
      src={imagePath}
      alt={`${rating} stars`}
      style={{
        height: "14px",
        width: `${size}px`,
        objectFit: "contain",
      }}
      onError={(e) => {
        e.target.src = `${API_BASE_URL}/ratings/rating-0.png`;
      }}
    />
  );
}

export default RatingStars;
