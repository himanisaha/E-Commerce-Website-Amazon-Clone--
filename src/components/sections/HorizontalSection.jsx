import React from 'react';
import { Link } from 'react-router-dom';

function HorizontalSection({ title, products }) {
  return (
    <section className="mb-4 bg-white p-3 rounded-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{title}</h5>
        <button className="btn btn-link btn-sm text-decoration-none p-0">
          See more
        </button>
      </div>

      <div
        className="d-flex gap-3 overflow-auto pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map(p => (
          <div
            key={p.id}
            className="card border-0"
            style={{ minWidth: 160, scrollSnapAlign: 'start' }}
          >
            <div className="d-flex justify-content-center align-items-center p-2">
              <img
                src={p.image}
                alt={p.title}
                style={{ height: 140, objectFit: 'contain' }}
              />
            </div>
            <div className="card-body p-0 px-2 pb-2">
              <p className="small mb-1 text-truncate">{p.title}</p>
              <p className="fw-bold mb-1">${p.price}</p>
              <Link
                to={`/product/${p.id}`}
                className="small text-decoration-none text-primary"
              >
                View product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HorizontalSection;
