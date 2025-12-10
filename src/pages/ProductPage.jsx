import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-5 text-center">
          <img src={product.image} alt={product.title} style={{ maxHeight: 300 }} />
        </div>
        <div className="col-md-7">
          <h3>{product.title}</h3>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-danger">${product.price}</h4>
          <p>{product.description}</p>
          <button className="btn btn-warning me-2">Add to Cart</button>
          <button className="btn btn-outline-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
