const express = require('express');
const router = express.Router();
const { registerUser, registerAdmin, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);        // Normal user registration
router.post('/register-admin', registerAdmin); // Admin registration
router.post('/login', loginUser);              // Login

module.exports = router;
