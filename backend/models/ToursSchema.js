const mongoose = require('mongoose');

// Schema и модель для тура
const ToursSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  age: Date,
  avatar: String,
  level: String,
  city: String,
  looking: String,
  kinder: Boolean,
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
  bike: Boolean,
  foot: Boolean,
  places: [String],
  heshtag: [String],
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

module.exports = mongoose.model('tours', ToursSchema);