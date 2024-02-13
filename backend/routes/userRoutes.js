const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const avatarController = require('../controllers/avatarController')

const router = express.Router()

router.post('/signup', userController.signUpUserController)
router.post('/auth', authController.authUserController)
router.post('/uploads-avatar', avatarController.addUserAvatar)
router.patch('/uploads-data-user', userController.uploadsDataUser)
router.get('/get-user', userController.getUserDataState)
router.get('/get-all-user', userController.getAllUsers)

module.exports = router
