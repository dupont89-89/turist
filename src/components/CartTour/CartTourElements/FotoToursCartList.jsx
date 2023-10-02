import React from 'react'
import s from '../CartTourCatalog.module.css'

export default function FotoToursCartList(props) {
  return (
    <div className={s.fotoTours}>
      <img src={props.descriptionImages} alt="" />
    </div>
  )
}
