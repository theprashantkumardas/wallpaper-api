const Category = require('../models/Category');

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

// POST a new category (Requires authentication and admin role)
exports.createCategory = async (req, res) => {
  try {
      const { name, description } = req.body;

      const category = new Category({
          name,
          description
      });

      const newCategory = await category.save();
      res.status(201).json(newCategory);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
  }
};
