import React from 'react'
import s from '../CartTourCatalog.module.css'
import { Link } from 'react-router-dom'

export default function NameUserCartList(props) {
  return (
    <div className={s.nameUser}><Link to="user/234">Дарья А.</Link></div>
  )
}