const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config(); // Ensure this is at the top

const connectDB = require('./src/config/database');


const wallpaperRoutes = require('./src/routes/wallpaperRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { verifyApiKey } = require('./src/middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

console.log('Loaded API Key:', process.env.CLOUDINARY_API_KEY); // Debugging line

console.log('Loaded Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Not Loaded');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not Loaded');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'Not Loaded');
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'Not Loaded');  // Check API Key
console.log('API_KEY:', process.env.API_KEY ? 'Loaded' : 'Not Loaded');  // Check API Key


// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/wallpapers', wallpaperRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Wallpaper API is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});