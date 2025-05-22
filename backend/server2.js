import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

// Initialize app and middleware
const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // For handling cross-origin requests

// Serve static files
app.use("/uploads", express.static("uploads"));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MongoDB Connection URI
const MONGO_URI = "mongodb://127.0.0.1:27017/campus_marketplace";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Product Schema and Model
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  seller: { type: String, required: true },
  contact: { type: String, required: true },
  photo: { type: String }, // Path to the uploaded photo
});

const Product = mongoose.model("Product", productSchema);

// Middleware for password protection
const authenticateAdmin = (req, res, next) => {
  const { password } = req.query; // Get password from query params
  if (password === "sam123") {
    next(); // Password is correct, proceed to the next middleware
  } else {
    res.status(403).json({ message: "Forbidden: Incorrect password" }); // Password is incorrect
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Campus Marketplace API!");
});

// Create a new product with a photo
app.post("/api/products", upload.single("photo"), async (req, res) => {
  try {
    const { title, description, price, seller, contact } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !price || !seller || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ title, description, price, seller, contact, photo });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a product by ID (requires admin password)
app.delete("/api/products/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

