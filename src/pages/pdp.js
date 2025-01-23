import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa"; // Importing the magic wand icon from react-icons

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
  description: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    lineHeight: "1.6",
    fontSize: "16px",
    color: "#333",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxHeight: "150px", // Collapsed height
    transition: "max-height 0.3s ease",
  },
  expandedDescription: {
    maxHeight: "none", // Expanded height
  },
  toggleButton: {
    marginTop: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  toggleButtonHover: {
    backgroundColor: "#0056b3",
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    fontSize: "16px",
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
};

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/product?style_id=${productId}`
        );
        const data = await response.json();
        setProduct(data.product);
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
        <img src={product.image_url} alt={product.title} style={styles.img} />
        <div style={styles.details}>
          <h2>{`${product?.sub_category} ${product?.category}`}</h2>
          <p style={styles.price}>${product.mrp}</p>
          {/* <p>{product.description}</p> */}
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <div
            style={{
              ...styles.description,
              ...(isDescriptionExpanded && styles.expandedDescription),
            }}
          >
            Slim-fitting style, contrast raglan long sleeve, three-button henley
            placket, light weight & soft fabric for breathable and comfortable
            wearing. And Solid stitched shirts with round neck made for
            durability and a great fit for casual fashion wear and diehard
            baseball fans. The Henley style round neckline includes a
            three-button placket.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
    </div>
  );
};

export default ProductDetailsPage;
