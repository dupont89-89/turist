import React, { useEffect } from 'react'
import s from '../Header/Header.module.css'
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";
import userFoto from './../../assets/images/User/51e01397234b5a76a923e66592d4f654.jpg'

export default function Header(props) {

  const {user } = useUser();

  return (
    <header>
      <Menu />
      <div className={s.gridHeaderRowTwo}>
        <div>
        </div>
        <div className={s.h1}>
          <Link to="/"><h1>Поиск попутчиков и сбор групп в путешествия</h1></Link>
          <Link className={s.btnNewTours} to="newtours/">Новый тур</Link>
        </div>
        <div className={s.helloName}>
          <div className={s.iconUser}>
            <img src={userFoto} alt="" />
          </div>
          <div className={s.name}>
          <span>Привет, {user && user.firstName} {user && user.lastName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
