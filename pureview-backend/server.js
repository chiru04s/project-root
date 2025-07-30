const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));      // Auth Routes
app.use('/api/scan', require('./routes/scan'));      // Scan Routes
app.use('/api/ai', require('./routes/ai'));          // AI Route
app.use('/api/contact', require('./routes/Contact'));// Contact Form Route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
