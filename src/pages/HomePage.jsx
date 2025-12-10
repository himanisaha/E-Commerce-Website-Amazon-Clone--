import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = styled.section`
  background: linear-gradient(120deg, #232f3e, #37475a);
  color: #fff;
  padding: 40px 20px;
`;

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products?limit=8')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  return (
    <>
      <Hero>
       <div className="container-fluid my-4">
          <h1 className="h3 fw-bold">Welcome to Amazon Clone</h1>
          <p className="mb-0">Browse popular products and add them to your cart.</p>
        </div>
      </Hero>

     <div className="container-fluid my-4">
        <div className="row g-3">
          {products.map(p => (
            <div className="col-6 col-md-3" key={p.id}>
              <div className="card h-100">
                <img src={p.image} className="card-img-top p-3" style={{ height: 180, objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title flex-grow-1">{p.title}</h6>
                  <p className="fw-bold mb-2">${p.price}</p>
                  <Link to={`/product/${p.id}`} className="btn btn-sm btn-warning w-100">
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
