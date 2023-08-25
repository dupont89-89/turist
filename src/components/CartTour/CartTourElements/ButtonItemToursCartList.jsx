import React from 'react'
import { Link } from 'react-router-dom'
import s from '../CartTourCatalog.module.css'

export default function ButtonItemToursCartList(props) {
  return (
    <div className={s.btnGridItemTours}>
      <div className={s.buttonItemTours}>
        <Link to='#'>Подробнее</Link>
      </div>
    </div>
  )
}
