// import React from "react";

// function RatingStars({ rating = 0, size = 80 }) {
//   const ratingKey = Math.round(Math.max(0, Math.min(5, rating)) * 10).toString();
  
//   const imageMap = {
//     "0": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102483/rating-0_cmabb0.png",
//     "05": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102482/rating-05_nhzsgk.png",
//     "10": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102484/rating-10_tuvtrh.png",
//     "15": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102485/rating-15_hqsziv.png",
//     "20": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102485/rating-20_kld9gt.png", 
//     "25": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102486/rating-25_vdifnp.png",
//     "30": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102487/rating-30_krdiko.png",
//     "35": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102488/rating-35_mqzueg.png",
//     "40": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102489/rating-40_qd3dip.png",
//     "45": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102490/rating-45_cppizz.png",
//     "50": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102491/rating-50_phgew3.png",
//   };

//   const imageSrc = imageMap[ratingKey] || imageMap["0"];

//   return (
//     <img
//       src={imageSrc}
//       alt={`${rating} stars`}
//       style={{
//         height: "16px",
//         width: `${size}px`,
//         objectFit: "contain",
//       }}
//       onError={(e) => {
//         e.target.src = imageMap["0"];
//       }}
//       loading="lazy"
//     />
//   );
// }

// export default RatingStars;

import React from "react";
import { FaStar } from "react-icons/fa";

function RatingStars({ rating = 0, size = 14 }) { // Smaller default size
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center" style={{ 
      gap: "1px", // Tighter spacing
      fontSize: 0 // Remove extra spacing
    }}>
      {/* Full stars */}
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar
          key={`full-${i}`}
          size={size}
          style={{
            color: "#FFA41C", // Amazon gold
            margin: 0,
            lineHeight: 1
          }}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div style={{ 
          position: "relative", 
          display: "inline-block", 
          width: size, 
          height: size,
          lineHeight: 1
        }}>
          <FaStar 
            size={size} 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "#e8e8e8", // Light gray background
              margin: 0
            }}
          />
          <FaStar
            size={size}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "#FFA41C", // Gold overlay
              clipPath: "inset(0 50% 0 0)",
              margin: 0
            }}
          />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaStar
          key={`empty-${i}`}
          size={size}
          style={{
            color: "#e8e8e8", // Light gray
            stroke: "#adb1b8",
            strokeWidth: 16,
            fill: "none",
            margin: 0,
            lineHeight: 1
          }}
        />
      ))}
    </div>
  );
}

export default RatingStars;
