import React from 'react'
import s from '../Header/Header.module.css'
import Sity from '../Sity/Sity'

export default function Header(props) {
  return (
    <header>
      <Sity />
      <div className={s.h1}>
        <h1>Поиск попутчиков и сбор групп в путешествия</h1>
      </div>
      <div>Заходите</div>
    </header>
  )
}
