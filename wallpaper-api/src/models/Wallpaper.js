const mongoose = require('mongoose');

const wallpaperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String, // Optional: URL to a smaller thumbnail
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Category model
    ref: 'Category', // Name of the Category model
    required: true,
  },
  tags: {
    type: [String], // Array of strings
    default: [],    // Default to an empty array
  },
  isSafeForWork: {
    type: Boolean,
    default: true, // Assume safe for work by default
  },
  viewCount: {
    type: Number,
    default: 0,    // Initialize to 0
  },
  downloadCount: {
    type: Number,
    default: 0,    // Initialize to 0
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

module.exports = Wallpaper;

//      json representation
//      {
//          "_id": "6564d0a4b2c6a86f735a99c2",
//          "name": "Sunset Over Mountains",
//          "description": "A stunning sunset view from a mountain peak.",
//          "imageUrl": "https://example.com/images/sunset_mountains.jpg",
//          "thumbnailUrl": "https://example.com/images/sunset_mountains_thumb.jpg",
//          "category": "6564d0a4b2c6a86f735a99c1", // ObjectId of a Category document
//          "tags": ["sunset", "mountains", "nature"],
//          "isSafeForWork": true,
//          "viewCount": 1250,
//          "downloadCount": 678,
//          "createdAt": "2023-11-27T18:30:00.000Z",
//          "updatedAt": "2023-11-27T18:30:00.000Z",
//          "__v": 0
//      }