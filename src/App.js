import { Route, Routes } from 'react-router-dom'; // Импорт Route и Routes
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token'); // Получите токен из куки
    console.log('Это APP токен', token)
    if (token) {
      // Создайте Axios-экземпляр с заголовком Authorization
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Отправьте GET-запрос на сервер
      axiosInstance.get('user/userdata')
        .then((response) => {
          if (response.status === 200) {
            // Получите данные пользователя из ответа
            const userData = response.data;
            // После получения данных пользователя, установите их в Redux
            dispatch(setDataDataUser(userData));
          } else {
            console.error('Error fetching user data. Status:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [dispatch]);
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="App">
      <div className="headerBackground">
        <div className='wrapperContent'>
          <HeaderContainer />
          <Routes>
            <Route exact path="/" element={<ContainerTourCatalog />} />
            <Route path="user/*" element={<UserPage />} />
            <Route path="signup/" element={<SignUp />} />
            <Route path="newtours/" element={<NewTours />} />
            <Route path="profile/*" element={<TourustProfile />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;