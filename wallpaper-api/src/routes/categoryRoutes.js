const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// GET all categories
router.get('/', categoryController.getAllCategories);

// GET a single category by ID
router.get('/:id', categoryController.getCategoryById);

// POST a new category (Requires authentication and admin role)
router.post('/', authenticateToken, isAdmin, categoryController.createCategory);

// PUT update a category by ID (Requires authentication and admin role)
// router.put('/:id', authenticateToken, isAdmin, categoryController.updateCategory);

// DELETE delete a category by ID (Requires authentication and admin role)
// router.delete('/:id', authenticateToken, isAdmin, categoryController.deleteCategory);

module.exports = router;