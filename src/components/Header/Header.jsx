import React from 'react'
import s from '../Header/Header.module.css'
import Menu from './Menu/Menu'
import { Link, useParams } from 'react-router-dom'
import avatar from '../../assets/images/User/traveler.png'

export default function Header(props) {

  return (
    <header>
      <Menu />
      <div className={s.gridHeaderRowTwo}>
        <div></div>
        <div className={s.h1}>
          <Link to="/"><h1>Поиск попутчиков и сбор групп в путешествия</h1></Link>
          <Link className={s.btnNewTours} to="newtours/">Новый тур</Link>
        </div>
        <div className={s.helloName}>
          <div className={s.iconUser}>
            {props.avatar ? (
              <img src={props.avatar} alt="" />
            ) : (
              <img src={avatar} alt="" />
            )}
          </div>
          <div className={s.name}><span>{props.firstName} {props.lastName} </span></div>
          {props.isAuthenticated ? (
            <span className={s.linkProfil}>
              <Link to="profile/">Профиль</Link>
            </span>
          ) : (
            <div className={s.btnSigIn}><Link to="login">Вход/Регистрация</Link></div>
          )}
        </div>
      </div >
    </header >
  )
}
