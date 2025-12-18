import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SearchPage() {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Load all products once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/products");
                console.log("products response", res.data[0]);   // log after declaration
                setProducts(res.data || []);
            } catch (err) {
                console.error("Error loading products", err);
            } finally {
                setLoading(false);
            }

        };

        fetchProducts();
    }, []);


    //Filter products by keyword (title or category)
    const q = (keyword || "").toLowerCase().trim();
    const words = q.split(" ").filter(Boolean); // e.g. ["men's", "hoodie"]

    const filtered = products.filter((p) => {
        const title = (p.title || p.name || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        const gender = (p.gender || "").toLowerCase(); // must be "men", "women", etc.

        // 1) basic word matching
        const haystack = `${title} ${category} ${gender}`;
        const matchesWords = words.every((w) => haystack.includes(w));

        // 2) extra gender rule: if query mentions "men", require gender === "men"
        if (q.includes("men")) {
            return matchesWords && gender === "men";
        }

        if (q.includes("women")) {
            return matchesWords && gender === "women";
        }

        return matchesWords;
    });



    if (loading) {
        return (
            <div className="container my-4">
                <h4>Search results for "{keyword}"</h4>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div
            className="py-4"
            style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}
        >
            <div className="container">
                <h4 className="mb-3">
                    Search results for "<span>{keyword}</span>"{" "}
                    <span style={{ fontSize: "14px", color: "#565959" }}>
                        ({filtered.length} found)
                    </span>
                </h4>

                {filtered.length === 0 && (
                    <p>No products found. Try a different keyword.</p>
                )}

                <div className="row">
                    {filtered.map((product) => (
                        <div key={product._id} className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <Link
                                    to={`/product/${product._id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <div className="text-center p-3">
                                        <img
                                            src={
                                                product.image?.startsWith("http")
                                                    ? product.image
                                                    : `http://localhost:8000${product.image}`
                                            }
                                            alt={product.title}
                                            style={{ height: 160, objectFit: "contain" }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title" style={{ minHeight: 40 }}>
                                            {product.title}
                                        </h6>
                                        <p className="mb-1" style={{ color: "#b12704" }}>
                                            ₹{product.price}
                                        </p>
                                        <p className="mb-0 small text-muted">
                                            {product.category}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
