import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sample styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "100vh",
  },
  pageWrapper: {
    background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)",
    minHeight: "100vh",
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  img: {
    maxWidth: "100%",
    height: "200px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "10px 0",
    height: "40px", // Fixed height for the title
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", // Prevent text wrapping
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  // Fetch products (mock API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1>Product Listing Page</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product.id} style={styles.card} onClick={()=>{
                  navigate(`/product/${product.id}`)
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={styles.img}
                />
                <h3 style={styles.title}>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                {/* <button style={styles.button}>Add to Cart</button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
