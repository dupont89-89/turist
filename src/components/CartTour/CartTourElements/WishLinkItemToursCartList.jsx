import React from 'react'
import { Link } from 'react-router-dom'
import s from '../CartTourCatalog.module.css'
import iconHealt from '../../../assets/images/cartTours/free-icon-favorite-11090394.png'

export default function WishLinkItemToursCartList(props) {
  return (
    <div className={s.linkWishGridItemTours}>
      <div className={s.linkItemTours}>
        <Link to='#'><img src={iconHealt} alt="" /> В избранное</Link>
      </div>
    </div>
  )
}
