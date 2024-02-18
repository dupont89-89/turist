import React from 'react'
import s from '../CartTourCatalog.module.css'

export default function RegionsUserCartList(props) {
  return (
    <div className={s.regionUser}>
      {props.age}, {props.sity}
    </div>
  )
}
