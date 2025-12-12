import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/sections/CategoryNav';
import HeroSlider from '../components/sections/HeroSlider';


function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <CategoryNav />
        <HeroSlider />
        <div className="container-fluid px-4 my-4">
          <p className="mb-0">Loading products...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* {/* Category nav directly under navbar } */}
      <CategoryNav />

      {/* Hero slider carousel */}
      <HeroSlider />

      <div className="container-fluid my-4 px-4">
        <h1 className="h3 fw-bold">Welcome to Amazon Clone</h1>
        <p className="mb-0">Browse popular products and add them to your cart.</p>

        <div className="row g-3 mt-3">
          {products.map((p) => (
            <div className="col-6 col-md-3 col-xl-2" key={p.id}>
              <div className="card h-100">
                <img
                  src={p.image}
                  className="card-img-top p-3"
                  style={{ height: 180, objectFit: 'contain' }}
                  alt={p.title}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title flex-grow-1 small">{p.title}</h6>
                  <p className="fw-bold mb-2">${p.price}</p>
                  <span className="badge bg-light text-dark mb-2 text-capitalize">
                    {p.category}
                  </span>
                  <Link
                    to={`/product/${p.id}`}
                    className="btn btn-sm btn-warning w-100">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
