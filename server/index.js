import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Models
import Product from './models/Product.js';
import Order from './models/Order.js';
import User from './models/User.js';

dotenv.config();
const app = express();

// Middleware
// Increased limit to 10mb to handle large Base64 profile images
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// Register New User
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ fullName, email, password, phone });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Note: In production, use bcrypt to compare hashed passwords
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login Successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User Profile (Image, Name, Phone)
app.put('/api/auth/profile/:id', async (req, res) => {
  try {
    const { fullName, phone, image } = req.body;
    
    // Create an update object dynamically
    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (phone) updates.phone = phone;
    if (image) updates.image = image; 

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { $set: updates }, 
      { new: true } // Return the updated document
    );

    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. PRODUCT ROUTES
// ==========================================

// Get Products (with Search & Category Filter)
app.get('/api/products', async (req, res) => {
  try {
    const { q, category } = req.query;
    let query = {};

    // Text Search (Case Insensitive)
    if (q) {
      query = { title: { $regex: q, $options: 'i' } };
    }
    
    // Category Filter
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. ORDER & CHECKOUT ROUTES
// ==========================================

// Place Order (Deduct Stock & Save Record)
app.post('/api/checkout', async (req, res) => {
  const { cartItems, userId, userName, totalAmount } = req.body;
  
  try {
    // 1. Verify Stock Availability
    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (product && product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.title}` });
      }
    }

    // 2. Deduct Stock
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item._id, { $inc: { stock: -item.quantity } });
    }

    // 3. Create Order Record
    const newOrder = new Order({
      userId,
      userName,
      items: cartItems,
      totalAmount
    });
    await newOrder.save();

    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Order History for a Specific User
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// SERVER STARTUP
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));