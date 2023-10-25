import { Route, Routes, Navigate } from 'react-router-dom'; // Импорт Route и Routes
import UserPage from './components/UserPage/UserPage';
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog';
import SignUp from './components/SignUp/SignUp';
import NewTours from './components/NewTours/NewTours';
import './App.css';
import TourustProfile from './components/UserProfile/TourustProfile';
import RegistrationForm from './components/Formik/RegistrationForm';
import LoginContainer from './components/Formik/LoginContainer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDataUserFromServer } from './api_request/api';
import { setDataDataUser } from './redux/user-reducer/user-reducer';
import HeaderContainer from './components/Header/HeaderContainer';
import axios from "axios";
import Login from './components/Formik/Login';

function App() {

  const user = localStorage.getItem("token");

  return (
    <div className="App">
      <div className="headerBackground">
        <div className='wrapperContent'>
          <HeaderContainer />
          <Routes>
            {user && <Route path="/" exact element={<ContainerTourCatalog />} />}
            <Route path="user/*" element={<UserPage />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="newtours/" element={<NewTours />} />
            <Route path="profile/*" element={<TourustProfile />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;