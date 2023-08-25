import React from 'react'
import s from '../CartTourCatalog.module.css'
import youWomenIconUsers from '../../../assets/images/cartTours/ToursSearchUser/free-icon-women-silhouette-45943.png'
import youSearchFrendsIconUsers from '../../../assets/images/cartTours/ToursSearchUser/icon-man-and-woman-9567131.png'

export default function IconSearchUsersToursCartList(props) {
  return (
    <div className={s.blockIconTours }>
      <div className={s.iconTours}>
        <img src={youWomenIconUsers} alt="" title='Я женщина' />
      </div>
      <span className={s.rightIcon}></span>
      <div className={s.iconTours}>
        <img src={youSearchFrendsIconUsers} alt="" title='Собираю группу' />
      </div>
    </div>
  )
}