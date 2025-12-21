import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/baseUrl";

function HeroSlider() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  // 🔹 Fetch banners from database
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/banners`)
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Banner fetch error:", err));
  }, []);

  // 🔹 Auto slide
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  const goNext = () =>
    setIndex((prev) => (prev + 1) % banners.length);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  // ⛔ Avoid rendering before data loads
  if (banners.length === 0) return null;

  return (
    <div className="position-relative bg-dark" style={{ overflow: "hidden" }}>
      <img
        src={`${BASE_URL}/banners/${banners[index].image}`}
        alt="Hero banner"
        className="w-100"
        style={{
          height: 320,
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />

      {/* Left arrow */}
      <button
        type="button"
        className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2"
        onClick={goPrev}
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        type="button"
        className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-2"
        onClick={goNext}
      >
        ›
      </button>
    </div>
  );
}

export default HeroSlider;
