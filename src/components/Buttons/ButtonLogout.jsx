import React from 'react';
import { useDispatch } from 'react-redux';
import { logout, logoutUserThunkCreator } from '../../redux/user-reducer/user-reducer';
import s from './Button.module.css'

const LogoutButton = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    
    // logoutUserThunkCreator();
    dispatch(logoutUserThunkCreator());
    // Вызовите действие "logout" для выполнения выхода
    // dispatch(logout());
    // Выполните дополнительные действия, если необходимо (например, перенаправление и т. д.)
  };

  return (
    <div className={s.btnLogOut}><button onClick={handleLogout}><span>Выйти</span></button></div>
  );
};

export default LogoutButton;


