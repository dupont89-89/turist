const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Импортируйте ваш middleware для аутентификации

const router = express.Router();

router.get('/', userController.checkServer);
router.post('/updateuserdata', userController.updateUserData);
router.get('/userdata', authMiddleware, userController.getDataUserAuth); // Примените authMiddleware к этому маршруту
module.exports = router;