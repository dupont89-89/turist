const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;

  console.log('Это токен authMiddleware перед Try', token)
  if (!token) {
    return res.status(401).json({ message: 'Неавторизован' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Это токен authMiddleware decoded', decoded)
    console.log('Это токен authMiddleware В try', token)
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен истек' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Ошибка валидации токена' });
    } else {
      // Обработка других ошибок
      console.error('Ошибка при верификации токена:', error); // Логирование ошибки
      return res.status(401).json({ message: 'Неавторизован' });
    }
  }
};

module.exports = authMiddleware;