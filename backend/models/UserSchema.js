const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  age: { type: Date },
  subscription: { type: Boolean },
  city: { type: String }, // Исправлено: было sity, изменено на city
  tel: { type: String },
  socialNetwork: [
    {
      vk: String,
      odnoklassniki: String,
      telegram: String,
    },
  ],
  vip: { type: Boolean },
  isOnline: { type: Boolean, default: false }, // Добавляем поле для статуса онлайн
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  })
  return token
}

// Функция для установки статуса пользователя "онлайн"
userSchema.methods.setOnline = function () {
  this.isOnline = true
}

// Функция для установки статуса пользователя "офлайн"
userSchema.methods.setOffline = function () {
  this.isOnline = false
}

const User = mongoose.model('user', userSchema)

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  })
  return schema.validate(data)
}

module.exports = { User, validate }
