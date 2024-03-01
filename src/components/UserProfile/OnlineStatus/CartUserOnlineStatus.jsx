import React from 'react'
import s from '../TouristProfile.module.css'
import iconImgStatus from '../../../assets/images/icon/free-icon-check-button-11391857.png'

export default function CartUserOnlineStatus(props) {
  const { isOnline } = props
  return (
    <div className={s.blockOnlineStatus}>
      {isOnline ? (
        <div className={s.iconStatusOnline}>
          <img src={iconImgStatus} alt='турист онлайн' />
          <span className={s.userCartOnlineStatus}>Онлайн</span>{' '}
        </div>
      ) : null}
    </div>
  )
}
