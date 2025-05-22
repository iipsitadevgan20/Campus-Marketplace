import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Sell from "./Sell.jsx";
import AdminProductList from "./Admin.jsx";
import AboutUs from "./AboutUs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/admin" element={<AdminProductList/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
      </Routes>
    </Router>
  </StrictMode>
);
