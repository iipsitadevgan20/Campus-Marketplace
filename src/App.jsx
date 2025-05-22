import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setMessage("");
    setForm({ name: "", email: "", phone: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering
        ? "http://localhost:3000/api/register"
        : "http://localhost:3000/api/login";

      const payload = isRegistering
        ? { name: form.name, email: form.email, phone: form.phone, password: form.password }
        : { email: form.email, password: form.password };

      const { data } = await axios.post(endpoint, payload);
      setMessage(data.message);
      if (!isRegistering) {
        navigate("/home"); // Redirect to /home after login
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f4f8",
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      width: "400px",
      padding: "25px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #ffffff, #e0e0e0)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "700",
      color: "#2d87f0",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#333",
    },
    input: {
      width: "92%",
      padding: "10px 15px",
      marginBottom: "15px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "#fff",
      transition: "border 0.3s",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "#2d87f0",
      color: "white",
      fontWeight: "600",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#1d6ec6",
      transform: "scale(1.05)",
    },
    message: {
      marginTop: "15px",
      textAlign: "center",
      fontWeight: "600",
    },
    toggleText: {
      marginTop: "15px",
      textAlign: "center",
      color: "#2d87f0",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "underline",
      transition: "color 0.3s",
    },
    toggleTextHover: {
      color: "#1d6ec6",
    },
  };
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.heading}>
          {isRegistering ? "Join the Marketplace" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label style={styles.label} htmlFor="name">
                Name
              </label>
              <input
                style={styles.input}
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
              <label style={styles.label} htmlFor="phone">
                Phone
              </label>
              <input
                style={styles.input}
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ backgroundColor: styles.buttonHover.backgroundColor }}
          >
            {isRegistering ? "Register" : "Login"}
          </motion.button>
        </form>
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("success") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
        <p style={styles.toggleText} onClick={toggleMode}>
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </motion.div>
    </div>
  );
};

export default App;
