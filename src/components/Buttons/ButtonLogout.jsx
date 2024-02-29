import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUserThunkCreator } from '../../redux/user-reducer/user-reducer'
import { establishWebSocketConnection } from '../Auth/UserStatus/UserStatus'
import s from './Button.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ws, setWs] = useState(null)

  useEffect(() => {
    const socket = establishWebSocketConnection()
    setWs(socket)

    // Подписка на событие закрытия соединения, если ws не равно null
    if (socket) {
      socket.onclose = () => {
        console.log('Соединение с WebSocket закрыто.')
      }
    }

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])

  const handleLogout = () => {
    if (ws) {
      ws.close()
    }

    dispatch(logoutUserThunkCreator())
    navigate('/')
  }

  return (
    <div className={s.btnLogOut}>
      <button onClick={handleLogout}>
        <span>Выйти</span>
      </button>
    </div>
  )
}

export default LogoutButton
