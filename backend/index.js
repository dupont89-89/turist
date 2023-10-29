const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const touristRoutes = require('./routes/touristRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: config.CLIENT_ORIGIN,
  credentials: true,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.CLIENT_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

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

app.use('/tours', touristRoutes);
app.use('/user', userRoutes);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});