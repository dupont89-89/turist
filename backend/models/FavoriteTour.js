const mongoose = require('mongoose')

const favoriteTourSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'tours' },
  dateAdded: { type: Date, default: Date.now },
  data: String,
})

module.exports = mongoose.model('FavoriteTour', favoriteTourSchema)
