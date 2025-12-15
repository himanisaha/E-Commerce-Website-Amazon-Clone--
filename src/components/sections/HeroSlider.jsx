import React, { useState, useEffect } from 'react';

const sliderImages = [
    '/banners/banner1.jpg',
    '/banners/banner2.jpg',
    '/banners/banner3.jpg',
]; // put these images in client/public/banners/

function HeroSlider() {
    const [index, setIndex] = useState(0);

    const goNext = () => setIndex((prev) => (prev + 1) % sliderImages.length);
    const goPrev = () =>
        setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    // auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(goNext, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="position-relative bg-dark" style={{ overflow: 'hidden' }}>
            <img
                src={sliderImages[index]}
                alt="Hero banner"
                className="w-100"
                style={{
                    height: 320,
                    objectFit: 'cover',
                    objectPosition: 'center top' // or '50% 80%'
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
