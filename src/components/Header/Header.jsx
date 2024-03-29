import React from 'react'
import s from '../Header/Header.module.css'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/User/traveler.png'
import ButtonSearchTuristHeader from '../Buttons/ButtonSearchTuristHeader'
import TopFive from '../Rating/TopFive'
import MenuProfilHeader from '../Menu/MenuProfilHeader'

export default function Header(props) {
  return (
    <header>
      <div className={s.gridHeaderRowTwo}>
        <TopFive />
        <div className={s.h1}>
          <Link to='/'>
            <h1>Поиск попутчиков и сбор групп в путешествия</h1>
          </Link>
          <div className={s.btnHeader}>
            <ButtonSearchTuristHeader
              link={'/'}
              color={'#fff'}
              title={'Поиск туров'}
              backColor={'#2a87d0'}
              size={'2rem'}
            />
            <ButtonSearchTuristHeader
              link={'newtours/'}
              color={'#000'}
              title={'Новый тур'}
              backColor={'#FFC107'}
              size={'2rem'}
            />
          </div>
        </div>
        <div className={s.helloName}>
          <div className={props.vip ? s.iconUserVip : s.iconUser}>
            {props.avatar ? <img src={props.avatar} alt='' /> : <img src={avatar} alt='' />}
          </div>
          <div className={s.name}>
            <span>
              {props.firstName} {props.lastName}{' '}
            </span>
          </div>
          {props.isAuthenticated ? (
            <MenuProfilHeader />
          ) : (
            <div className={s.btnSigIn}>
              <Link to='login'>Вход/Регистрация</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
