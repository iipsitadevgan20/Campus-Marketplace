import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // State for expanded card

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f8f8f8",
    },
    heading: {
      textAlign: "center",
      fontSize: "36px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "30px",
    },
    error: {
      color: "#ff6347",
      textAlign: "center",
      fontWeight: "bold",
    },
    searchBox: {
      width: "100%",
      padding: "10px 15px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
      marginTop: "30px",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    expandedCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      position: "relative",
      zIndex: 10,
      maxWidth: "800px",
      margin: "0 auto",
    },
    leftContent: {
      flex: "1",
    },
    rightContent: {
      flex: "1",
      textAlign: "center",
    },
    cardHeading: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2d87f0",
      marginBottom: "12px",
    },
    cardText: {
      fontSize: "16px",
      color: "#555",
    },
    photo: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#2d87f0",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#ff6347",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.heading}>Available Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBox}
        />

        {error && <p style={styles.error}>{error}</p>}

        {selectedProduct ? (
          <motion.div
            style={styles.expandedCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              style={styles.closeButton}
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <div style={styles.leftContent}>
              <h2 style={styles.cardHeading}>{selectedProduct.title}</h2>
              <p style={styles.cardText}>{selectedProduct.description}</p>
              <p style={styles.cardText}>
                <strong>Price:</strong> ₹{selectedProduct.price}
              </p>
              <p style={styles.cardText}>
                <strong>Seller:</strong> {selectedProduct.seller}
              </p>
              <p style={styles.cardText}>
                <strong>Contact:</strong> {selectedProduct.contact}
              </p>
            </div>
            <div style={styles.rightContent}>
              {selectedProduct.photo && (
                <img
                  src={`http://localhost:5000${selectedProduct.photo}`}
                  alt={selectedProduct.title}
                  style={styles.photo}
                />
              )}
            </div>
          </motion.div>
        ) : (
          <div style={styles.cards}>
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                style={styles.card}
                onClick={() => setSelectedProduct(product)}
                whileHover={{ scale: 1.05 }}
              >
                {product.photo && (
                  <img
                    src={`http://localhost:5000${product.photo}`}
                    alt={product.title}
                    style={styles.photo}
                  />
                )}
                <h2 style={styles.cardHeading}>{product.title}</h2>
                <p style={styles.cardText}>{product.description}</p>
                <p style={styles.cardText}>
                  <strong>Price:</strong> ₹{product.price}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
