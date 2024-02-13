const express = require('express')
const multer = require('multer')
const touristController = require('../controllers/touristController')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tours/')
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage })

const router = express.Router()

router.get('/', touristController.checkServer)
router.post('/newsetdatatours', upload.single('images'), touristController.addTouristData)
router.get('/gettours', touristController.getTours)
//router.get('/getdatauserstours', touristController.getDataUserTours)

module.exports = router
