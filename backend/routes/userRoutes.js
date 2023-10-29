const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.signUpUserController);
router.post('/auth', authController.authUserController);

module.exports = router;