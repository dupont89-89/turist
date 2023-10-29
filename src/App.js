import { Route, Routes, Navigate } from 'react-router-dom'; // Импорт Route и Routes
import UserPage from './components/UserPage/UserPage';
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog';
import SignUp from './components/Auth/SignUp/SignUp';
import NewTours from './components/NewTours/NewTours';
import './App.css';
import TourustProfile from './components/UserProfile/TourustProfile';
import RegistrationForm from './components/Formik/RegistrationForm';
import LoginContainer from './components/Auth/Login/LoginContainer';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuthSuccess, setDataUser } from './redux/user-reducer/user-reducer';
import HeaderContainer from './components/Header/HeaderContainer';

function App({ setDataUser, setAuthSuccess, isAuthenticated }) {

  const [isLoading, setIsLoading] = useState(true); // Добавим состояние для отслеживания загрузки

  useEffect(() => {
    // Попытка получить данные пользователя из localStorage при инициализации приложения
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      // Сохраняем данные пользователя в Redux-состоянии
      setDataUser(storedUserData);
      setAuthSuccess()
    }

    setIsLoading(false);
  }, [setDataUser, setAuthSuccess]);

  if (isLoading) {
    // Если данные еще загружаются, можно показать прелоадер
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="headerBackground">
        <div className='wrapperContent'>
          <HeaderContainer />
          <Routes>
            {isAuthenticated && <Route path="newtours/" exact element={<NewTours />} />}
            <Route path="/" element={<ContainerTourCatalog />} />
            <Route path="user/*" element={<UserPage />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="profile/*" element={<TourustProfile />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" exact element={<LoginContainer />} />
			      <Route path="/newtours/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setDataUser,
  setAuthSuccess,
};

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);