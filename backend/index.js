// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid'); // Импортируем функцию v4 из библиотеки uuid

// const PORT = 5000; // Порт сервера
// const HOST = 'http://localhost'; // Хост сервера
// const serverURL = `${HOST}:${PORT}`; // URL сервера

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/tours/'); // Указываем папку для сохранения изображений
//   },
//   filename: function (req, file, cb) {
//     const uniqueFilename = `${uuidv4()}-${file.originalname}`; // Генерируем уникальное имя файла
//     cb(null, uniqueFilename);
//   },
// });

// const upload = multer({ storage });

// const app = express();
// // Использование middleware
// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true, // Разрешение использовать учетные данные в запросах
// }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// app.use('/uploads/tours', express.static('uploads/tours'));

// mongoose.connect('mongodb://localhost:27017/tourist-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// // Schema и модель для тура
// const ToursSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   surname: String,
//   age: Number,
//   avatar: String,
//   level: String,
//   city: String,
//   looking: String,
//   kinder: Boolean,
//   text: String,
//   images: [
//     {
//       link: String, // Ссылка на изображение
//       filename: String, // Имя файла изображения
//       contentType: String, // Тип файла, например, "image/jpeg" или "image/png"
//     },
//   ],
//   goal: [String],
//   train: Boolean,
//   air: Boolean,
//   car: Boolean,
//   bicycle: Boolean,
//   places: [String],
//   Ihave: Boolean,
//   total: Number,
//   selectedOptionData: String,
//   start_date: Date,
//   end_date: Date,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Tours = mongoose.model('tours', ToursSchema);

// // Роут для проверки работоспособности сервера
// app.get('/', (req, res) => {
//   res.send('App is Working');
// });

// function parseStringArray(value) {
//   if (typeof value === 'string') {
//     return value.split(',').map(item => item.trim());
//   }
//   return value;
// }

// // Роут для добавления данных о туристах
// app.post('/newsetdatatours', upload.single('images'), async (req, res) => {
//   try {
//     const tourData = req.body;
//     if (!tourData) {
//       return res.status(400).send('Invalid data format');
//     }

//     tourData.goal = parseStringArray(tourData.goal);
//     tourData.places = parseStringArray(tourData.places);

//     // Получите путь к загруженному файлу
//     const imagePath = req.file.path;

//     // Создайте объект для поля "images"
//     const imageObject = {
//       data: fs.readFileSync(imagePath), // Читаем изображение в бинарном формате
//       contentType: req.file.mimetype, // Указываем тип контента из заголовка файла
//     };

//     // Создайте ссылку на изображение, например, '/uploads/tours/' + имя файла
//     const imageLink = `${serverURL}/uploads/tours/${req.file.filename}`;

//     // Создайте объект изображения с ссылкой и добавьте его в массив
//     const imageItem = {
//       link: imageLink,
//       data: imageObject.data,
//       contentType: imageObject.contentType,
//     };

//     // Добавьте объект изображения в массив
//     tourData.images = [imageItem];

//     const newTouristData = new Tours(tourData);
//     let result = await newTouristData.save();
//     result = result.toObject();
//     if (result) {
//       res.send(result);
//       console.log('New tourist data added:', result);
//     } else {
//       console.log('Failed to add new tourist data');
//     }
//   } catch (e) {
//     console.error('Error adding new tourist data:', e);
//     res.status(500).send('Something Went Wrong');
//   }
// });

// app.get('/tours', async (req, res) => {
//   try {
//     // Здесь вам нужно выполнить запрос к базе данных, чтобы получить данные о турах
//     const tours = await Tours.find(); // Например, здесь мы используем модель Tours для поиска всех туров

//     // Отправьте данные в ответе на GET-запрос
//     res.json(tours);
//   } catch (error) {
//     console.error('Error fetching tours:', error);
//     res.status(500).send('Something Went Wrong');
//   }
// });

// // Запуск сервера на порту PORT
// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const touristRoutes = require('./routes/touristRoutes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // Импортируем bcrypt
const User = require('./models/User'); // Импортируем модель пользователя
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Импортируйте cookie-parser
require('dotenv').config()
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use(cookieParser()); // Используйте cookie-parser

// app.use(cors({
//   origin: config.CLIENT_ORIGIN,
//   credentials: true,
//   methods: 'GET, POST, PUT, DELETE',
//   allowedHeaders: 'Content-Type, Authorization',
// }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.CLIENT_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use((req, res, next) => {
//   console.log('Received request:', req.url);
//   console.log('Headers:', req.headers);
//   next();
// });

// app.use(session({
//   secret: process.env.SECRET_KEY, // Используйте значение из config.js
//   resave: false,
//   saveUninitialized: false,
// }));

app.use('/uploads/tours', express.static('uploads/tours'));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



// Пути для запросов
app.use('/tours', touristRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use('/user', userRoutes);
// app.use('/auth', authRoutes); // Используем маршруты аутентификации

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user || !bcrypt.compareSync(password, user.password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
//   req.session.user = user;
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});