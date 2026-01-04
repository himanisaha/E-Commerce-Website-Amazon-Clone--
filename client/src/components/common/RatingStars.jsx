import React from "react";

function RatingStars({ rating = 0, size = 80 }) {
  const ratingKey = Math.round(Math.max(0, Math.min(5, rating)) * 10).toString();
  
  const imageMap = {
    "0": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102483/rating-0_cmabb0.png",
    "05": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102482/rating-05_nhzsgk.png",
    "10": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102484/rating-10_tuvtrh.png",
    "15": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102485/rating-15_hqsziv.png",
    "20": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102485/rating-20_kld9gt.png", 
    "25": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102486/rating-25_vdifnp.png",
    "30": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102487/rating-30_krdiko.png",
    "35": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102488/rating-35_mqzueg.png",
    "40": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102489/rating-40_qd3dip.png",
    "45": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102490/rating-45_cppizz.png",
    "50": "https://res.cloudinary.com/dcxgfue03/image/upload/v1767102491/rating-50_phgew3.png",
  };

  const imageSrc = imageMap[ratingKey] || imageMap["0"];

  return (
    <img
      src={imageSrc}
      alt={`${rating} stars`}
      style={{
        height: "16px",
        width: `${size}px`,
        objectFit: "contain",
      }}
      onError={(e) => {
        e.target.src = imageMap["0"];
      }}
      loading="lazy"
    />
  );
}

export default RatingStars;
