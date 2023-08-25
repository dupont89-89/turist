import React from 'react'
import s from '../CartTourCatalog.module.css'
import { Link } from 'react-router-dom'
import PopupRatingUsers from '../../Popup/CartTours/PopupRatingUsers'

export default function LevelTrustUserCartList(props) {
  return (
    <div className={s.userTrust}>
      <PopupRatingUsers nameBtnPopup={"Средний уровень доверия"} />
    </div>
  )
}
