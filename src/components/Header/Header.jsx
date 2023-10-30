import React, { useEffect } from 'react'
import s from '../Header/Header.module.css'
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import LogoutButton from '../Buttons/ButtonLogout';

export default function Header(props) {

useEffect(() => {
  console.log("useEffect triggered");
  console.log("Props:", props);
  // Ваш код здесь
}, [props.isAuthenticated, props.avatar, props.lastName, props.firstName]);


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
          {props.isAuthenticated ? (
            <>
              <div className={s.iconUser}><img src={props.avatar} alt="" /></div>
              <div className={s.name}><span>{props.lastName} {props.firstName}</span></div>
            </>
          ) : null}
          {props.isAuthenticated ? (<LogoutButton />
          ) : <Link className={s.btnSigIn} to="login">Вход/Регистрация</Link>
          }
        </div>
      </div >
    </header >
  )
}
