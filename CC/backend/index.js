const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const segmentRoutes = require('./routes/segmentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection URI: prefer storing in .env, fallback to this string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://rishwanthasokan29:Rishwanth@woocommerce.zksusye.mongodb.net/woocommerce';

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.text());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  });

// Health check route
app.get('/', (req, res) => {
  res.send('Hello, WooCommerce Backend By Rishwanth!');
});

// Routes
app.use('/products', productRoutes);
app.use('/segments', segmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
