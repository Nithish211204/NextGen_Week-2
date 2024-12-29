import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products"); // Replace with your backend URL
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to add products to your cart");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/cart/add",  // Your backend route to add to cart
                { productId, quantity: 1 },
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            alert("Product added to cart!");
        } catch (err) {
            console.error("Error adding product to cart:", err);
            alert("Failed to add product to cart.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="all-products">
            <h1>All Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.customId} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>₹{product.price}</strong></p>
                        <button onClick={() => addToCart(product._id)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
