import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa"; // Importing the magic wand icon from react-icons


// Sample styles
const styles = {
  pageWrapper: {
    background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)",
    minHeight: "100vh",
    width: "100%",
  },
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    fontSize:'16px',
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
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  button2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)", // Gradient background
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(18, 194, 233, 0.5)",
    transition: "all 0.3s ease",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "uppercase",
    gap: "8px", // Add spacing between icon and text
  },
  button2Hover: {
    backgroundColor: "#7209b7",
    boxShadow: "0 0 20px rgba(114, 9, 183, 0.7)",
    transform: "scale(1.05)",
  },
  suggestedSection: {
    marginTop: "40px",
    borderTop: "1px solid #eee",
    padding: "20px 0",
  },
  suggestedTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  suggestedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  suggestedProduct: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "5px",
  },
  suggestedImg: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
  },
};

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
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

  // Fetch suggested products
  useEffect(() => {
    if (product) {
      const fetchSuggestedProducts = async () => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${product.category}`
          );
          const data = await response.json();
          setSuggestedProducts(
            data.filter(item => item.id !== product.id).slice(0, 5)
          );
        } catch (error) {
          console.error("Failed to fetch suggested products:", error);
        }
      };
      fetchSuggestedProducts();
    }
  }, [product]);

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
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          ← Back to Products
        </button>
        <div style={styles.product}>
          <img src={product.image} alt={product.title} style={styles.img} />
          <div style={styles.details}>
            <h2>{product.title}</h2>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button style={styles.button}>Add to Cart</button>
              <button
                      style={styles.button2}
                      onMouseEnter={(e) => {
                          e.target.style.boxShadow = styles.button2Hover.boxShadow;
                          e.target.style.transform = styles.button2Hover.transform;
                      }}
                      onMouseLeave={(e) => {
                          e.target.style.boxShadow = styles.button2.boxShadow;
                          e.target.style.transform = "scale(1)";
                      }}
                      >
                      <FaMagic style={{ fontSize: "18px" }} /> {/* Magic wand icon */}
                      Style Me
                  </button>
              </div>
          </div>
        </div>
        <div style={styles.suggestedSection}>
          <h3 style={styles.suggestedTitle}>Suggested Combinations</h3>
          <div style={styles.suggestedGrid}>
            {suggestedProducts.map((item) => (
              <div key={item.id} style={styles.suggestedProduct}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.suggestedImg}
                />
                <h4>{item.title.substring(0, 50)}...</h4>
                <p style={styles.price}>${item.price.toFixed(2)}</p>
                <button 
                  style={styles.button}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  Go to Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
