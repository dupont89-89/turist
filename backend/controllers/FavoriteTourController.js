const { default: mongoose } = require('mongoose')
const FavoriteTour = require('../models/FavoriteTour')

exports.addFavoriteTour = async (req, res) => {
  try {
    // Получаем userId и tourId из тела запроса
    const { userId, tourId, data } = req.body

    // Проверяем, существует ли уже запись с такой связкой userId и tourId
    const existingFavoriteTour = await FavoriteTour.findOne({ userId, tourId })

    // Если запись уже существует, возвращаем сообщение о том, что тур уже добавлен в избранное
    if (existingFavoriteTour) {
      return res.status(400).json({ success: false, message: 'Tour is already added to favorites.' })
    }

    // Создаем новую запись в коллекции избранных туров
    const favoriteTour = new FavoriteTour({
      userId,
      tourId,
      data,
    })

    // Сохраняем запись в базе данных
    await favoriteTour.save()

    // Отправляем успешный ответ
    res.status(200).json({ success: true, message: 'Tour added to favorites.', favoriteTour })
  } catch (error) {
    // Если произошла ошибка, отправляем соответствующий статус и сообщение об ошибке
    console.error('Error adding tour to favorites:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.delCountByTour = async (req, res) => {
  try {
    const userId = req.body.userId
    const tourId = req.body.tourId

    // Найти и удалить запись, где userId и tourId совпадают
    const deletedRecord = await FavoriteTour.findOneAndDelete({ userId, tourId })

    if (deletedRecord) {
      res.status(200).json({ success: true, message: 'Record deleted successfully' })
    } else {
      res.status(404).json({ success: false, message: 'Record not found' })
    }
  } catch (error) {
    console.error('Error deleting record:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.getFavoriteToursByUserId = async (req, res) => {
  try {
    // Получаем userId из параметров запроса
    const userId = req.params.userId

    // Ищем все туры, которые добавил пользователь с заданным userId в избранное
    const favoriteTours = await FavoriteTour.find({ userId: userId })

    // Отправляем найденные туры в ответе
    res.status(200).json({ success: true, favoriteTours: favoriteTours })
  } catch (error) {
    // Если произошла ошибка, отправляем соответствующий статус и сообщение об ошибке
    console.error('Error fetching favorite tours:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.getCountByTourIds = async (req, res) => {
  try {
    // Получите массив всех tourId, для которых нужно подсчитать количество избранных туров
    const { tourIds } = req.body

    // Используйте агрегацию MongoDB для подсчета общего количества избранных туров для каждого tourId
    const counts = await FavoriteTour.aggregate([
      { $match: { tourId: { $in: tourIds.map((id) => new mongoose.Types.ObjectId(id)) } } },
      { $group: { _id: '$tourId', count: { $sum: 1 } } },
    ])

    // Верните массив объектов, содержащих tourId и соответствующее количество избранных туров
    res.status(200).json({ counts })
  } catch (error) {
    console.error('Error counting favorite tours:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}
