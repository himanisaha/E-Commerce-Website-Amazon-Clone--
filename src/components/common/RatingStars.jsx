import React from "react";

function RatingStars({ rating = 0, size = 80 }) {
  // Convert rating (0–5) → 0–50 (steps of 5)
  const roundedRating = Math.round(rating * 2) * 5;

  const imagePath = `/images/ratings/rating-${roundedRating}.png`;

  return (
    <img
      src={imagePath}
      alt={`${rating} stars`}
      style={{
        height: "14px",
        width: `${size}px`,
        objectFit: "contain"
      }}
    />
  );
}

export default RatingStars;
