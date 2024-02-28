const WebSocket = require('ws')
const config = require('../config/config')
const { User } = require('../models/UserSchema') // Подключаем модель пользователя

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({
    server,
    // Установка CORS заголовков для WebSocket соединений
    verifyClient: (info, cb) => {
      // Здесь вы можете проверить origin и решить, разрешать ли соединение или нет
      const origin = info.origin || info.req.headers.origin
      // Например, проверка origin на соответствие разрешенным
      if (origin === config.CLIENT_ORIGIN) {
        cb(true)
      } else {
        cb(false, 403, 'Origin not allowed')
      }
    },
  })

  wss.on('connection', function connection(ws) {
    console.log('User connected.')

    ws.on('message', async function incoming(message) {
      console.log('received: %s', message)
      try {
        const data = JSON.parse(message)
        console.log('Data received:', data)

        // Проверяем, есть ли у нас идентификатор пользователя в полученных данных
        if (data.userId) {
          // Обновляем статус пользователя в базе данных
          await User.findByIdAndUpdate(data.userId, { $set: { isOnline: true } })
          console.log(`Статус пользователя с идентификатором ${data.userId} обновлен.`)
        } else {
          console.log('Идентификатор пользователя не найден в полученных данных.')
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    })

    ws.on('close', async function close() {
      console.log('User disconnected.')
      // Также вы можете обновить статус пользователя на "офлайн", когда он отключается
      // Например:
      // await User.findByIdAndUpdate(userId, { $set: { isOnline: false } });
    })
  })
}

module.exports = createWebSocketServer
