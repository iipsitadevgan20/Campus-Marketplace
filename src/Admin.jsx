import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [password, setPassword] = useState(""); // state for password input
  const [isAuthenticated, setIsAuthenticated] = useState(false); // flag for authentication

  // Password validation logic
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "sam123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password! Access Denied.");
    }
  };

  // Fetch products once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/products");
          setProducts(response.data);
        } catch (err) {
          setError("Failed to fetch products. Please try again.");
        }
      };

      fetchProducts();
    }
  }, [isAuthenticated]);

  // Delete product function
  const deleteProduct = async (id) => {
    try {
      // Send password along with product ID for authentication
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`, {
        params: { password }, // Pass password in query params
      });
      alert(response.data.message);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert("Failed to delete product. Please try again.");
    }
  };

  // Framer Motion animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const hoverEffects = {
    scale: 1.05,
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <div style={styles.container}>
          <h1 style={styles.heading}>Admin Product List</h1>
          {error && <p style={styles.error}>{error}</p>}

          {products.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px" }}>No products available.</p>
          ) : (
            <div style={styles.cards}>
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  style={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={styles.cardHover}
                >
                  <h2 style={styles.cardHeading}>{product.title}</h2>
                  <p style={styles.cardText}>{product.description}</p>
                  <p style={styles.cardText}>
                    <strong style={styles.cardStrong}>Price:</strong> ₹{product.price}
                  </p>
                  <p style={styles.cardText}>
                    <strong style={styles.cardStrong}>Seller:</strong> {product.seller}
                  </p>
                  <p style={styles.cardText}>
                    <strong style={styles.cardStrong}>Contact:</strong> {product.contact}
                  </p>

                  {/* Delete button */}
                  <motion.button
                    onClick={() => deleteProduct(product._id)}
                    style={styles.deleteButton}
                    whileHover={{ backgroundColor: "#e74c3c" }}
                  >
                    Delete Product
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={styles.loginContainer}>
          <h2>Enter Password to Access Admin Panel</h2>
          <form onSubmit={handlePasswordSubmit} style={styles.form}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={styles.passwordInput}
            />
            <button type="submit" style={styles.loginButton}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// Styles
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
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  error: {
    color: "#ff6347",
    textAlign: "center",
    fontWeight: "bold",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    justifyContent: "center",
    marginTop: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHover: {
    scale: 1.05,
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
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
    lineHeight: "1.6",
    marginBottom: "8px",
  },
  cardStrong: {
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "15px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  passwordInput: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "250px",
    marginTop: "20px",
  },
  loginButton: {
    padding: "10px 20px",
    backgroundColor: "#2d87f0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AdminProductList;
