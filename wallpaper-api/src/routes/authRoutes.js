const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST register a new user
router.post('/register', authController.register);

// POST login user
router.post('/login', authController.login);

module.exports = router;