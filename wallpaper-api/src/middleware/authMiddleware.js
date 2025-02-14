require('dotenv').config();  // Load dotenv again for debugging
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (Invalid token)
        }
        req.user = user;
        next();
    });
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Middleware to verify API Key
exports.verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Check for API key in headers

    console.log('Received API Key:', apiKey);
    console.log('Expected API Key:', process.env.CLOUDINARY_API_KEY);

    if (!apiKey) {
        return res.status(401).json({ message: 'API key required' });
    }

    if (apiKey !== process.env.CLOUDINARY_API_KEY) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    next();
};