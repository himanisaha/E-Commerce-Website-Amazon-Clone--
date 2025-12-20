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
                console.log("products response", res.data[0]);
                setProducts(res.data || []);
            } catch (err) {
                console.error("Error loading products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // 2. Filter products by keyword
    const rawQ = (keyword || "").toLowerCase().trim();

    const normalize = (s) =>
        (s || "")
            .toLowerCase()
            .replace(/'/g, "")
            .replace(/womens/g, "women")
            .replace(/mens/g, "men");

    const q = normalize(rawQ);
    const words = q.split(" ").filter(Boolean);
    const mainWord = words[words.length - 1] || "";

    const isMenSearch = /\bmen\b/.test(q);
    const isWomenSearch = /\bwomen\b/.test(q);

    const filtered = products.filter((p) => {
        const title = normalize(p.title || p.name || "");
        const category = normalize(p.category || "");
        const gender = normalize(p.gender || "");
        const desc = normalize(p.description || "");

        const text = `${title} ${category} ${desc} ${gender}`;
        const titleCategory = `${title} ${category}`;

        let matches;
        if (words.length > 1) {
            // every word in full text AND at least one in title/category
            const allInText = words.every((w) => text.includes(w));
            const oneInTitleCategory = words.some((w) => titleCategory.includes(w));
            matches = allInText && oneInTitleCategory;
        } else {
            matches = mainWord ? text.includes(mainWord) : true;
        }

        // If query contains "baking", require category to contain "baking"
        if (q.includes("baking") && !category.includes("baking")) {
            matches = false;
        }

        if (isMenSearch) return matches && gender === "men";
        if (isWomenSearch) return matches && gender === "women";
        return matches;
    });



    console.log("SEARCH PAGE ACTIVE", { keyword, count: filtered.length });

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
                        <div key={product._id} className="col-6 col-sm-4 col-md-3 mb-4">
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
                                            alt={product.title || product.name}
                                            style={{ height: 160, objectFit: "contain" }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title" style={{ minHeight: 40 }}>
                                            {product.title || product.name}
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
