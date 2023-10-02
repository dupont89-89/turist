const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// Использование middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Разрешение использовать учетные данные в запросах
}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

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

// Schema для пользователей
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('users', UserSchema);

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
  images: String,
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

// Роут для регистрации пользователей
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password; // Предположим, что у вас есть поле password в объекте
      res.send(req.body);
      console.log(result);
    } else {
      console.log('User already registered');
    }
  } catch (e) {
    res.status(500).send('Something Went Wrong');
  }
});

// Роут для добавления данных о туристах
app.post('/newsetdatatours', async (req, res) => {
  try {
    const tourData = req.body;
    if (!tourData) {
      return res.status(400).send('Invalid data format');
    }

    const newTouristData = new Tours(req.body);
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


