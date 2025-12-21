import React from "react";
import { BASE_URL } from "../../api/baseUrl";


function RatingStars({ rating = 0, size = 80 }) {
  // Convert 0–5 → nearest multiple of 10 (0–50)
  const roundedRating = Math.round(rating * 2) * 5;

  const imagePath = `${BASE_URL}/ratings/rating-${roundedRating}.png`;

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
        e.target.src = `${BASE_URL}/ratings/rating-0.png`;
      }}
    />
  );
}

export default RatingStars;
