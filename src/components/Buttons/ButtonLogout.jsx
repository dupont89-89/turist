import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user-reducer/user-reducer';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Вызовите действие "logout" для выполнения выхода
    dispatch(logout());
    // Выполните дополнительные действия, если необходимо (например, перенаправление и т. д.)
  };

  return (
    <button onClick={handleLogout}>Выход</button>
  );
};

export default LogoutButton;