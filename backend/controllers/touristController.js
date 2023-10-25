const mongoose = require('mongoose');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const Tours = require('../models/ToursSchema'); // Убедитесь, что модель правильно импортирована

const serverURL = config.SERVER_URL; // Добавьте эту строку

function parseStringArray(value) {
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim());
  }
  return value;
}

exports.checkServer = (req, res) => {
  res.send('App is Working');
};

exports.addTouristData = async (req, res) => {
  try {
    const tourData = req.body;
    if (!tourData) {
      return res.status(400).send('Invalid data format');
    }

    tourData.goal = parseStringArray(tourData.goal);
    tourData.places = parseStringArray(tourData.places);
    tourData.heshtag = parseStringArray(tourData.heshtag);

    // Получите путь к загруженному файлу
    const imagePath = req.file.path;

    // Создайте объект для поля "images"
    const imageObject = {
      data: fs.readFileSync(imagePath), // Читаем изображение в бинарном формате
      contentType: req.file.mimetype, // Указываем тип контента из заголовка файла
    };

    // Создайте ссылку на изображение, например, '/uploads/tours/' + имя файла
    const imageLink = `${serverURL}/uploads/tours/${req.file.filename}`;

    // Создайте объект изображения с ссылкой и добавьте его в массив
    const imageItem = {
      link: imageLink,
      data: imageObject.data,
      contentType: imageObject.contentType,
    };

    // Добавьте объект изображения в массив
    tourData.images = [imageItem];

    const newTouristData = new Tours(tourData); // Используете модель "Tours" из правильного импорта
    let result = await newTouristData.save();
    result = result.toObject();
    if (result) {
      res.send(result);
      console.log('New tourist data added:', result);
    } else {
      console.log('Failed to add new tourist data');
    }
  } catch (error) {
    console.error('Error adding new tourist data:', error);
    res.status(500).send('Something Went Wrong');
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tours.find();
    res.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).send('Something Went Wrong');
  }
};