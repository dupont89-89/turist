import React from 'react'
import s from '../CartTourCatalog.module.css'
import youWomenIconUsers from '../../../assets/images/cartTours/ToursSearchUser/free-icon-women-silhouette-45943.png'
import youManIconUsers from '../../../assets/images/cartTours/ToursSearchUser/free-icon-man-3439472.png'
import youSearchFrendsIconUsers from '../../../assets/images/cartTours/ToursSearchUser/icon-man-and-woman-9567131.png'
import youSearchWoomenIconUsers from '../../../assets/images/cartTours/ToursSearchUser/-icon-women-couple-43058.png'
import youSearchGruppIconUsers from '../../../assets/images/cartTours/ToursSearchUser/icon-grupp.png'
import youSearchManManIconUsers from '../../../assets/images/cartTours/ToursSearchUser/icon-man-man.png'
import youSearchManWomenGrupIconUsers from '../../../assets/images/cartTours/ToursSearchUser/icon-man-women-grup.png'

export default function IconSearchUsersToursCartList(props) {
  
  const icons = {
    'Ищу попутчицу': youWomenIconUsers,
    'Ищу попутчика': youManIconUsers,
    'Собираю группу': youSearchGruppIconUsers,
    'Ищу попутчика или попутчицу': youSearchFrendsIconUsers,
    'Ищу попутчицу или женскую компанию': youSearchWoomenIconUsers,
    'Ищу попутчика или мужскую компанию': youSearchManManIconUsers,
    'Ищу попутчицу, попутчика или компанию': youSearchManWomenGrupIconUsers,
  };

  return (
    <div className={s.blockIconTours }>
      <div className={s.iconTours}>
        <img src={youWomenIconUsers} alt="" title='Я женщина' />
      </div>
      <span className={s.rightIcon}></span>
      <div className={s.iconTours}> 
      {icons[props.looking] && (
          <img src={icons[props.looking]} alt="" title={props.looking} />
        )}
      </div>
    </div>
  )
}