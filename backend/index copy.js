const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Импортируем функцию v4 из библиотеки uuid

const PORT = 5000; // Порт сервера
const HOST = 'http://localhost'; // Хост сервера
const serverURL = `${HOST}:${PORT}`; // URL сервера

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/tours/'); // Указываем папку для сохранения изображений
//   },
//   filename: function (req, file, cb) {
//     const originalFilename = file.originalname;
//     cb(null, originalFilename); // Используем оригинальное имя файла
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tours/'); // Указываем папку для сохранения изображений
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`; // Генерируем уникальное имя файла
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const app = express();
// Использование middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Разрешение использовать учетные данные в запросах
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/uploads/tours', express.static('uploads/tours'));

mongoose.connect('mongodb://localhost:27017/tourist-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Schema и модель для тура
const ToursSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  age: Number,
  avatar: String,
  level: String,
  city: String,
  isMale: Boolean,
  isSeekingCouple: Boolean,
  isSeekingFemale: Boolean,
  isGroup: Boolean,
  text: String,
  images: [
    {
      link: String, // Ссылка на изображение
      filename: String, // Имя файла изображения
      contentType: String, // Тип файла, например, "image/jpeg" или "image/png"
    },
  ],
  goal: [String],
  train: Boolean,
  air: Boolean,
  car: Boolean,
  bicycle: Boolean,
  places: [String],
  Ihave: Boolean,
  total: Number,
  selectedOptionData: String,
  start_date: Date,
  end_date: Date,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tours = mongoose.model('tours', ToursSchema);

// Роут для проверки работоспособности сервера
app.get('/', (req, res) => {
  res.send('App is Working');
});

function parseStringArray(value) {
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim());
  }
  return value;
}

// Роут для добавления данных о туристах
app.post('/newsetdatatours', upload.single('images'), async (req, res) => {
  try {
    const tourData = req.body;
    if (!tourData) {
      return res.status(400).send('Invalid data format');
    }

    tourData.goal = parseStringArray(tourData.goal);
    tourData.places = parseStringArray(tourData.places);

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

    const newTouristData = new Tours(tourData);
    let result = await newTouristData.save();
    result = result.toObject();
    if (result) {
      res.send(result);
      console.log('New tourist data added:', result);
    } else {
      console.log('Failed to add new tourist data');
    }
  } catch (e) {
    console.error('Error adding new tourist data:', e);
    res.status(500).send('Something Went Wrong');
  }
});

app.get('/tours', async (req, res) => {
  try {
    // Здесь вам нужно выполнить запрос к базе данных, чтобы получить данные о турах
    const tours = await Tours.find(); // Например, здесь мы используем модель Tours для поиска всех туров

    // Отправьте данные в ответе на GET-запрос
    res.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).send('Something Went Wrong');
  }
});

// Запуск сервера на порту PORT
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});