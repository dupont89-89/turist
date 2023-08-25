import React, { Children } from 'react'
import s from '../Buttons/ButtonStandart.module.css'

export default function ButtonStandart(props) {
  return (
    <button className={s.buttonStandart} type={Children}>{Children}</button>
  )
}
