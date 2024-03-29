const config = require('../../../config')

export function establishWebSocketConnection() {
  const userId = JSON.parse(localStorage.getItem('userId'))
  const ws = new WebSocket(`ws://${config.SERVER_DOMEN}:${config.PORT}`) // Используйте 'ws://' или 'wss://' в зависимости от конфигурации вашего сервера

  ws.onopen = function () {
    console.log('Соединение с WebSocket установлено.')
    const message = { userId: userId, isOnline: true }
    ws.send(JSON.stringify(message))
  }

  ws.onmessage = function (event) {
    console.log('Получено сообщение от сервера:', event.data)
  }

  ws.onclose = function () {
    debugger
    console.log('Соединение с WebSocket закрыто.')
  }

  ws.onerror = function (error) {
    console.error('Ошибка WebSocket:', error)
  }
  return ws
}
