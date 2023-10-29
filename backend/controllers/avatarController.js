const multer = require("multer");
const path = require("path");
const { User } = require("../models/UserSchema");
const config = require('../config/config');

const serverURL = config.SERVER_URL; // Замените на вашу переменную, содержащую URL сервера

// Объявляем middleware для загрузки аватара
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware для добавления аватара пользователя
exports.addUserAvatar = (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      // Обработка ошибки Multer
      console.error("Ошибка загрузки файла: ", err);
      res.status(500).json({ error: "Ошибка загрузки файла" });
    } else {
      const avatarPath = req.file.path.replace(/\\/g, "/"); // Заменяем обратные слеши на прямые
      const userId = req.query.userId;

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { avatar: serverURL + '/' + avatarPath }
        );

        if (!updatedUser) {
          // Обработка ошибки, если не удалось обновить пользователя
          res.status(500).json({ error: "Ошибка обновления пользователя" });
        } else {
          console.log("Аватар пользователя успешно добавлен.");
          res.json({ avatarPath });
        }
      } catch (error) {
        // Обработка других ошибок
        console.error("Ошибка обновления пользователя: ", error);
        res.status(500).json({ error: "Ошибка обновления пользователя" });
      }
    }
  });
};