// const Category = require('../models/Category');

// // GET all categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // GET a single category by ID
// exports.getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // POST a new category (Requires authentication and admin role)
// exports.createCategory = async (req, res) => {
//   try {
//       const { name, description } = req.body;

//       const category = new Category({
//           name,
//           description
//       });

//       const newCategory = await category.save();
//       res.status(201).json(newCategory);
//   } catch (error) {
//       console.error(error);
//       res.status(400).json({ message: error.message });
//   }
// };

const Category = require('../models/Category');
const { uploadImage } = require('../utils/cloudinaryService');
const fs = require('fs');

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST a new category with image upload
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const uploadResult = await uploadImage(req.file.path);

    // Delete local file after uploading to Cloudinary
    try {
      fs.unlinkSync(req.file.path);
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError);
    }

    const category = new Category({
      name,
      description,
      imageUrl: uploadResult.secure_url
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an existing category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryId = req.params.id;

    // Find the existing category
    let category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let imageUrl = category.imageUrl; // Keep the existing image if no new image is uploaded

    if (req.file) {
      // Upload new image to Cloudinary
      const uploadResult = await uploadImage(req.file.path);

      // Delete local file after Cloudinary upload
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting local file:', unlinkError);
      }

      imageUrl = uploadResult.secure_url; // Update with new image URL
    }

    // Update category fields
    category.name = name || category.name;
    category.description = description || category.description;
    category.imageUrl = imageUrl;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};