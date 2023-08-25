const express = require('express');
const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const cityName = require('./api/city.json');

app.get('/api/city', (req, res) => {
  res.json({ data: cityName });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

