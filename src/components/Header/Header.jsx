import React from 'react'
import s from '../Header/Header.module.css'
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import LogoutButton from '../Buttons/ButtonLogout';

export default function Header(props) {

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

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
          {props.isAuthenticated ? (<LogoutButton />
          ) : <Link className={s.btnSigIn} to="login">Вход/Регистрация</Link>
          }
        </div>
        <button className={s.white_btn} onClick={handleLogout}>
					Logout
				</button>
      </div >
    </header >
  )
}
