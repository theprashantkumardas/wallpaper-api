const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,  // Cloudinary image URL
    required: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;