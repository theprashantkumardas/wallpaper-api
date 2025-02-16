// const express = require('express');
// const router = express.Router();
// const categoryController = require('../controllers/categoryController');
// const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// // GET all categories
// router.get('/', categoryController.getAllCategories);

// // GET a single category by ID
// router.get('/:id', categoryController.getCategoryById);

// // POST a new category (Requires authentication and admin role)
// // router.post('/', authenticateToken, isAdmin, categoryController.createCategory);
// router.post('/',  categoryController.createCategory);

// // PUT update a category by ID (Requires authentication and admin role)
// // router.put('/:id', authenticateToken, isAdmin, categoryController.updateCategory);

// // DELETE delete a category by ID (Requires authentication and admin role)
// // router.delete('/:id', authenticateToken, isAdmin, categoryController.deleteCategory);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

// GET all categories
router.get('/', categoryController.getAllCategories);

// GET a single category by ID
router.get('/:id', categoryController.getCategoryById);

// POST a new category (Requires authentication and admin role)
router.post('/', upload.single('image'), categoryController.createCategory);


// **PUT update a category by ID**
router.put('/:id',  upload.single('image'), categoryController.updateCategory);

module.exports = router;