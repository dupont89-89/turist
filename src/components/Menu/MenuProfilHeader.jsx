import React from 'react'
import { Link } from 'react-router-dom'
import s from './Menu.module.css'

export default function MenuProfilHeader(props) {
  return (
    <div className={s.linkProfil}>
      <Link className={s.linkProfileHeader} to='profile/'>
        Профиль
      </Link>
      <div className={s.submenu}>
        <Link to='edit-profile/'>Редактировать</Link>
        <Link to='add-vip/'>Получить VIP</Link>
        <Link to='/submenu3'>Моя страница</Link>
        <Link to='/submenu4'>Мои туры</Link>
        <Link className={s.linkBottomHeader} to='/submenu5'>
          Пункт 5
        </Link>
      </div>
    </div>
  )
}
