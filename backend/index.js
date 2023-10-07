const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Указываем папку для сохранения изображений
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Генерируем уникальное имя файла
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
  images: {
    data: Buffer, // Тип Buffer для хранения бинарных данных файла
    contentType: String, // Тип файла, например, "image/jpeg" или "image/png"
  },
  goal: String,
  day: Number,
  month: Number,
  year: Number,
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

// Роут для добавления данных о туристах
app.post('/newsetdatatours', upload.single('images'), async (req, res) => {
  try {
    const tourData = req.body;
    if (!tourData) {
      return res.status(400).send('Invalid data format');
    }

    // Получите путь к загруженному файлу
    const imagePath = req.file.path;

    // Создайте объект для поля "images"
    const imageObject = {
      data: fs.readFileSync(imagePath), // Читаем изображение в бинарном формате
      contentType: req.file.mimetype, // Указываем тип контента из заголовка файла
    };

    // Добавьте объект "images" к данным
    tourData.images = imageObject;

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
// Запуск сервера на порту 5000
app.listen(5000, () => {
  console.log('App is listening on port 5000');
});