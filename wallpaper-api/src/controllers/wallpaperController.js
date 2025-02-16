const Wallpaper = require('../models/Wallpaper');

// POST a new wallpaper
exports.createWallpaper = async (req, res) => {
  try {
    const { name, description, category, tags, isSafeForWork } = req.body;
    if (!req.body.imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const wallpaper = new Wallpaper({
      name,
      description,
      imageUrl: req.body.imageUrl,
      category,
      tags,
      isSafeForWork
    });

    const newWallpaper = await wallpaper.save();
    res.status(201).json(newWallpaper);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// GET all wallpapers
// exports.getAllWallpapers = async (req, res) => {
//   try {
//     const category = req.query.category; // Get the category from query parameters
//     let query = {}; // Create empty query
//     if (category) {
//       query = { category: category }; // If category is provided, add it to the query
//     }
//     const wallpapers = await Wallpaper.find(query); // Apply the query
//     res.json(wallpapers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
exports.getAllWallpapers = async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters
    let query = {}; 

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
      query.category = new mongoose.Types.ObjectId(category); // Convert to ObjectId
    }

    const wallpapers = await Wallpaper.find(query);
    res.json(wallpapers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a single wallpaper by ID
exports.getWallpaperById = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findById(req.params.id).populate('category');
    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }
    res.json(wallpaper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
