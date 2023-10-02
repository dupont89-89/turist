import React from 'react'
import s from '../CartTourCatalog.module.css'

export default function GoalsUserToursCartList(props) {
  return (
    <div className={s.goalsUserBlock}>
      Мои цели: <span className={s.goalsUser}>{props.goal}</span>
    </div>
  )
}
