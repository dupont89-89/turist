import React, { useEffect } from 'react'
import s from '../Header/Header.module.css'
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";
import userFoto from './../../assets/images/User/51e01397234b5a76a923e66592d4f654.jpg'
import axios from 'axios'; // Добавьте импорт axios

export default function Header(props) {

  const { isLoaded, isSignedIn, user } = useUser();
  debugger;

  // Используйте useEffect для вызова getUser
  useEffect(() => {
    async function getUser(userId) {
      try {
        const response = await axios.get(`https://clean-penguin-8.clerk.accounts.dev/v1/users/${userId}`, options);
        debugger;
        return response;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (isLoaded && isSignedIn) {
      getUser(user.id);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  
  if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  
  const options = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${clerkPubKey}`
    }
  };

  // Используйте правильный синтаксис для объявления функции
  async function getUser(userId) {
    const response = await axios.get(`https://clean-penguin-8.clerk.accounts.dev/v1/users/${userId}`, options);
    debugger;
    return response;
  }

  return (
    <header>
      <Menu />
      <div className={s.gridHeaderRowTwo}>
        <div>
        </div>
        <div className={s.h1}>
          <Link to="/"><h1>Поиск попутчиков и сбор групп в путешествия</h1></Link>
          <Link className={s.btnNewTours} to="newtours/">Новый тур</Link>
          <button onClick={getUser}>Получить пользователя</button>
        </div>
        <div className={s.helloName}>
          <div className={s.iconUser}>
            <img src={userFoto} alt="" />
          </div>
          <div className={s.name}>
            <span>Привет, {user.firstName} {user.lastName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
