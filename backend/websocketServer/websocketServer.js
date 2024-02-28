const WebSocket = require('ws')
const config = require('../config/config')
const { User } = require('../models/UserSchema')

const pingInterval = 120000
const clients = new Map()

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({
    server,
    verifyClient: (info, cb) => {
      const origin = info.origin || info.req.headers.origin
      if (origin === config.CLIENT_ORIGIN) {
        cb(true)
      } else {
        cb(false, 403, 'Origin not allowed')
      }
    },
  })

  wss.on('connection', function connection(ws) {
    console.log('User connected.')
    // Добавляем соединение в карту клиентов
    clients.set(ws, null)

    ws.on('message', async function incoming(message) {
      console.log('received: %s', message)
      try {
        const data = JSON.parse(message)
        console.log('Data received:', data)

        if (data.userId) {
          // Обновляем соответствующий идентификатор пользователя в карте клиентов
          clients.set(ws, data.userId)
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
      // Получаем идентификатор пользователя, который отключился
      const userId = clients.get(ws)
      if (userId) {
        // Обновляем статус пользователя в базе данных на false
        await User.findByIdAndUpdate(userId, { $set: { isOnline: false } })
        console.log(`Статус пользователя с идентификатором ${userId} обновлен.`)
        clients.delete(ws) // Удаляем соединение из карты клиентов
      }
    })
  })

  setInterval(async () => {
    for (const [ws, userId] of clients.entries()) {
      try {
        if (userId) {
          ws.send(JSON.stringify({ action: 'checkOnlineStatus' }))
        }
      } catch (error) {
        console.error('Error sending ping:', error)
      }
    }
  }, pingInterval)
}

module.exports = createWebSocketServer
