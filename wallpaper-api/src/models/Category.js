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
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;


//      json representation
//      {
//          "_id": "6564d0a4b2c6a86f735a99c1",
//          "name": "Nature",
//          "description": "Beautiful nature wallpapers",
//          "createdAt": "2023-11-27T18:25:00.000Z",
//          "updatedAt": "2023-11-27T18:25:00.000Z",
//          "__v": 0
//      }