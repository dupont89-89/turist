import React from 'react'
import s from './UserPage.module.css'
import PopupRatingUsers from '../Popup/CartTours/PopupRatingUsers'

export default function UserPageLevel(props) {
  return (
    <div className={s.userTrust}>
      <PopupRatingUsers nameBtnPopup={"Средний уровень доверия"} />
    </div>
  )
}