const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User'); 

exports.checkServer = (req, res) => {
  res.send('App is Working');
};

exports.updateUserData = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData) {
      return res.status(400).send('Неверный формат данных');
    }

    // Получите идентификатор пользователя из запроса
    const userId = userData._id; // Предполагается, что `_id` пользователя передается в запросе

    // Обновите пользователя, включив только необходимые данные
    const updatedUser = await User.findByIdAndUpdate(userId, { name: userData.name }, { new: true });

    if (updatedUser) {
      res.send(updatedUser);
      console.log('Данные пользователя успешно обновлены:', updatedUser);
    } else {
      console.log('Не удалось обновить данные пользователя');
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    res.status(500).send('Что-то пошло не так');
  }
};


exports.getDataUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Извлечь userId из проверенного токена
    const user = await User.findById(userId); // Найти пользователя в базе данных по userId
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Вернуть данные пользователя
    res.json({
      username: user.username,
      userId: user._id,
      // Другие свойства пользователя
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDataUserAuth = async (req, res) => {
  console.log('Это getDataUserAuth', req.user); // Замените req на req.user
  try {
    // Ваши данные о пользователе уже доступны в req.user
    res.json({
      username: req.user.username,
      userId: req.user.userId,
      // Другие свойства пользователя
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.getTours = async (req, res) => {
//   try {
//     const tours = await Tours.find();
//     res.json(tours);
//   } catch (error) {
//     console.error('Error fetching tours:', error);
//     res.status(500).send('Something Went Wrong');
//   }
// };