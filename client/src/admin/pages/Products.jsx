import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // new state for filters + pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch products from backend
  const fetchProducts = () => {
    const token = localStorage.getItem("adminToken");

    axios
      .get(`${API_BASE_URL}/api/admin/products/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add Product
  const handleAddProduct = (e) => {
    e.preventDefault();

    const form = e.target;
    const newProduct = {
      name: form.name.value,
      price: form.price.value,
      image: form.image.value,
      description: form.description.value,
      category: form.category.value || "",
      rating: form.rating.value ? Number(form.rating.value) : 0,
      highlights: form.highlights.value
        ? form.highlights.value.split(",").map((s) => s.trim())
        : [],
      specifications: form.specifications.value
        ? form.specifications.value.split("\n").reduce((acc, line) => {
          const [k, v] = line.split(":");
          if (k && v) acc[k.trim()] = v.trim();
          return acc;
        }, {})
        : {},
    };

    const token = localStorage.getItem("adminToken");

    axios
      .post(`${API_BASE_URL}/api/admin/products/add`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        fetchProducts();
        form.reset();

        const modalEl = document.getElementById("addProductModal");
        const modal = window.bootstrap?.Modal.getInstance(modalEl);
        modal?.hide();

        setSuccessMsg("Product added successfully");
        setTimeout(() => setSuccessMsg(""), 10000);
      })
      .catch((err) => console.error(err));
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem("adminToken");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    axios
      .delete(`${API_BASE_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

  // Update Product (Edit modal submit)
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      price: form.price.value,
      image: form.image.value,
      description: form.description.value,
      category: form.category?.value || "",
      rating: form.rating?.value ? Number(form.rating.value) : 0,
      highlights: form.highlights?.value
        ? form.highlights.value.split(",").map((s) => s.trim())
        : [],
      specifications: form.specifications?.value
        ? form.specifications.value.split("\n").reduce((acc, line) => {
          const [k, v] = line.split(":");
          if (k && v) acc[k.trim()] = v.trim();
          return acc;
        }, {})
        : {},
    };

    const token = localStorage.getItem("adminToken");

    axios
      .put(
        `${API_BASE_URL}/api/admin/products/${editingProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        fetchProducts();

        // Close the edit modal
        const modalEl = document.getElementById("editProductModal");
        const modal = window.bootstrap?.Modal.getInstance(modalEl);
        modal?.hide();

        // Clear selected product and show success message
        setEditingProduct(null);
        setSuccessMsg("Product updated successfully");
        setTimeout(() => setSuccessMsg(""), 10000);
      })
      .catch((err) => console.error(err));
  };

  // effects + handlers (fetchProducts, handleAddProduct, etc.)

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter ||
      (p.category || "").toLowerCase() === categoryFilter.toLowerCase();

    const price = Number(p.price) || 0;
    const matchesMin = !minPrice || price >= Number(minPrice);
    const matchesMax = !maxPrice || price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );
  return (
    <>
      {/* Global success alert (for add + edit) */}
      {successMsg && (
        <div className="alert alert-success d-flex align-items-center py-2 mb-2">
          <i className="bi bi-check-circle-fill me-2"></i>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Add Product
        </button>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by category..."
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Products Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{startIndex + index + 1}</td>

                <td>
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : `${API_BASE_URL}${product.image}`
                    }
                    alt={product.name}
                    className="img-thumbnail"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>

                <td>{product.name}</td>
                <td>₹{product.price}</td>

                {/* 👉 Actions column */}
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editProductModal"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingProduct(product);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="me-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProductModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Rating (0–5)</label>
                  <input
                    type="number"
                    name="rating"
                    className="form-control"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Highlights (comma separated)
                  </label>
                  <input
                    type="text"
                    name="highlights"
                    className="form-control"
                    placeholder="Soft material, Adjustable strap, Lightweight"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Specifications (key:value, one per line)
                  </label>
                  <textarea
                    name="specifications"
                    className="form-control"
                    rows="3"
                    placeholder={`Material:Cotton\nColor:Black\nSize:Free`}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <div
        className="modal fade"
        id="editProductModal"
        tabIndex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProductModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {editingProduct && (
                <form onSubmit={handleUpdateProduct}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      defaultValue={editingProduct.name}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      defaultValue={editingProduct.price}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      defaultValue={editingProduct.image}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      defaultValue={editingProduct.description}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      defaultValue={editingProduct.category || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rating (0–5)</label>
                    <input
                      type="number"
                      name="rating"
                      className="form-control"
                      min="0"
                      max="5"
                      step="0.1"
                      defaultValue={editingProduct.rating || 0}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Highlights (comma separated)
                    </label>
                    <input
                      type="text"
                      name="highlights"
                      className="form-control"
                      defaultValue={
                        Array.isArray(editingProduct.highlights)
                          ? editingProduct.highlights.join(", ")
                          : ""
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Specifications (key:value, one per line)
                    </label>
                    <textarea
                      name="specifications"
                      className="form-control"
                      rows="3"
                      defaultValue={
                        editingProduct.specifications
                          ? Object.entries(editingProduct.specifications)
                            .map(([k, v]) => `${k}:${v}`)
                            .join("\n")
                          : ""
                      }
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
