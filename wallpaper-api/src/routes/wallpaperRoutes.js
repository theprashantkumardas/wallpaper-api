const express = require('express');
const router = express.Router();
const multer = require('multer');
const wallpaperController = require('../controllers/wallpaperController');
const { authenticateToken, isAdmin, verifyApiKey } = require('../middleware/authMiddleware');
const fs = require('fs');
const { uploadImage } = require('../utils/cloudinaryService');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/', { recursive: true });
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

// POST /api/wallpapers
router.post(
  '/',
  authenticateToken,
  isAdmin,
  verifyApiKey,
  upload.single('image'),  // Multer should be before the logging middleware
  (req, res, next) => {
    console.log('Incoming request body:', req.body);
    console.log('Incoming request headers:', req.headers);
    console.log('Received file:', req.file); // Now req.file is processed
    next();
  },
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    try {
      const uploadResult = await uploadImage(req.file.path);
      
      // Delete local file only if Cloudinary upload is successful
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting local file:', unlinkError);
      }

      req.body.imageUrl = uploadResult.secure_url;
      await wallpaperController.createWallpaper(req, res);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
);

// GET all wallpapers
router.get('/', wallpaperController.getAllWallpapers);

// GET a single wallpaper by ID
router.get('/:id', wallpaperController.getWallpaperById);

module.exports = router;