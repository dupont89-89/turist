import React from 'react'
import s from '../CartTourCatalog.module.css'
import fototours from '../../../assets/images/cartTours/ToursFotoUsers/photo-1516010018112-e21911e10eac.jpg'

export default function FotoToursCartList(props) {
  return (
    <div className={s.fotoTours}>
      <img src={fototours} alt="" />
    </div>
  )
}
