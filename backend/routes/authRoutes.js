// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// const authRouter = express.Router();

// authRouter.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Проверка, существует ли пользователь с таким логином
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       // Пользователь с таким логином уже существует, возвращаем ошибку
//       return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
//     }

//     // Если пользователя с таким логином не существует, продолжаем регистрацию
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     console.log('Пользователь успешно зарегистрирован');

//     res.json({ message: 'Регистрация прошла успешно' });
//   } catch (error) {
//     console.error('Ошибка при регистрации:', error);
//     res.status(500).json({ message: 'Ошибка регистрации' });
//   }
// });

// authRouter.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     // const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//     console.log('Токен: ', token);

//     res.json({
//       message: 'Login successful',
//       token: token, // Возвращаем токен в ответе
//       user: {
//         username: user.username,
//         userId: user._id,
//         // Другие свойства пользователя
//       },
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// authRouter.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

//     // Установите токен в куки
//     res.cookie('token', token, { httpOnly: true }); // Используйте httpOnly для безопасности

//     res.json({
//       message: 'Login successful',
//       user: {
//         username: user.username,
//         userId: user._id,
//         // Другие свойства пользователя
//       },
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// module.exports = authRouter;