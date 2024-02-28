const { User, validate } = require('../models/UserSchema')
const bcrypt = require('bcrypt')

exports.signUpUserController = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(409).send({ message: 'User with given email already Exist!' })

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    await new User({ ...req.body, password: hashPassword }).save()
    res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

exports.getUserDataState = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId })
    if (user) {
      // User found, send the user data in the response
      const userData = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        age: user.age,
        subscription: user.subscription,
        sity: user.sity,
        tel: user.tel,
        socialNetwork: user.socialNetwork, // Другие данные, которые вы хотите добавить
        vip: user.vip,
      }
      res.status(200).json({ userData }) // Assuming you want to send the user data as JSON
    } else {
      // User not found, send a 404 Not Found response
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error retrieving user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.uploadsDataUser = async (req, res) => {
  try {
    const userId = req.query.userId
    // Извлеките идентификатор пользователя из запроса (это может быть параметр в URL или тело запроса)

    // Извлеките обновления пользователя из тела запроса
    const updates = req.body

    // Проверьте, есть ли идентификатор пользователя и данные для обновления
    if (!userId || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Invalid request. Please provide a userId and updates.' })
    }

    // Поиск пользователя по идентификатору
    const user = await User.findOne({ _id: userId })

    if (user) {
      // Обновите поля пользователя на основе переданных обновлений
      if (updates.firstName) {
        user.firstName = updates.firstName
      }
      if (updates.lastName) {
        user.lastName = updates.lastName
      }
      if (updates.sity) {
        user.sity = updates.sity
      }
      if (updates.tel) {
        user.tel = updates.tel
      }
      if (updates.age) {
        user.age = new Date(updates.age)
      }
      if (updates.vip !== undefined) {
        user.vip = updates.vip
      }

      // Другие обновления...

      // Сохраните обновленные данные пользователя в базе данных
      await user.save()

      // Отправьте успешный ответ
      res.status(200).json({ message: 'User data updated successfully' })
    } else {
      // Пользователь не найден, отправьте 404 Not Found
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Обработка ошибок
    console.error('Error updating user data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password') // Исключаем поле "password"
    res.json(allUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send('Something Went Wrong')
  }
}

exports.setUserStatus = async (req, res) => {
  const { userId, isOnline } = req.body

  try {
    // Найдем пользователя по userId
    const user = await User.findById(userId)

    // Если пользователь не найден, вернем ошибку
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    // Обновим статус пользователя
    user.isOnline = isOnline
    await user.save()

    return res.status(200).json({ message: 'Статус пользователя успешно обновлен' })
  } catch (error) {
    console.error('Ошибка при обновлении статуса пользователя:', error)
    return res.status(500).json({ message: 'Произошла ошибка при обновлении статуса пользователя' })
  }
}
