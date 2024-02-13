import { Route, Routes, Navigate } from 'react-router-dom' // Импорт Route и Routes
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog'
import SignUp from './components/Auth/SignUp/SignUp'
import './App.css'
import LoginContainer from './components/Auth/Login/LoginContainer'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { setAuthSuccess } from './redux/user-reducer/user-reducer'
import HeaderContainer from './components/Header/HeaderContainer'
import { getAllUser, getUser } from './api_request/api'
import NewToursContainer from './components/NewTours/NewToursContainer'
import TourustProfileContainer from './components/UserProfile/TourustProfileContainer'
import UserPageContainer from './components/UserPage/UserPageContainer'
import SidebarMenu from './components/Sidebar/SidebarMenu'
import AddVipUserContainer from './components/UserProfile/VipStatus/AddVipUserContainer'

function App({ setAuthSuccess, getUser, isAuthenticated, getAllUser }) {
  const [isLoading, setIsLoading] = useState(true) // Добавим состояние для отслеживания загрузки

  useEffect(() => {
    // Попытка получить данные пользователя из localStorage при инициализации приложения
    // const storedUserData = JSON.parse(localStorage.getItem('userData'));
    getAllUser()
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (userId) {
      // Сохраняем данные пользователя в Redux-состоянии
      // setDataUser(storedUserData);
      setAuthSuccess()
      // getUser(userId)
      getUser(userId)
    }
    setIsLoading(false)
  }, [isAuthenticated])

  if (isLoading) {
    // Если данные еще загружаются, можно показать прелоадер
    return <div>Загрузка...</div>
  }

  return (
    <div className='App'>
      <HeaderContainer />
      <div className='siteContent'>
        <div className='wrapperContent'>
          <div className='sidebarContent'>
            <div className='sidebarGridBlock'>
              <SidebarMenu />
            </div>
            <div className='contenGridBlock'>
              <Routes>
                {isAuthenticated && <Route path='newtours/' exact element={<NewToursContainer />} />}
                {isAuthenticated && <Route path='edit-profile/' exact element={<TourustProfileContainer />} />}
                {isAuthenticated && <Route path='add-vip/' exact element={<AddVipUserContainer />} />}
                <Route path='/' element={<ContainerTourCatalog />} />
                <Route path='user/*' element={<UserPageContainer />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='login' exact element={<LoginContainer />} />
                <Route path='newtours/' element={<Navigate replace to='/login' />} />
                <Route path='profile/' element={<Navigate replace to='/login' />} />
                <Route path='edit-profile/' element={<Navigate replace to='/login' />} />
                <Route path='add-vip/' element={<Navigate replace to='/login' />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  setAuthSuccess,
  getUser,
  getAllUser,
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
