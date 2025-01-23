import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Sample styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  product: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  img: {
    maxWidth: "300px",
    height: "auto",
    borderRadius: "5px",
  },
  details: {
    marginTop: "20px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007BFF",
  },
  button: {
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    marginBottom: "15px",
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#555",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container}>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <div style={styles.product}>
        <img src={product.image} alt={product.title} style={styles.img} />
        <div style={styles.details}>
          <h2>{product.title}</h2>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <button style={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
