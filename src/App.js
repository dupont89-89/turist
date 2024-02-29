import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog'
import SignUp from './components/Auth/SignUp/SignUp'
import './App.css'
import LoginContainer from './components/Auth/Login/LoginContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import SidebarMenu from './components/Sidebar/SidebarMenu'
import NewToursContainer from './components/NewTours/NewToursContainer'
import TourustProfileContainer from './components/UserProfile/TourustProfileContainer'
import AddVipUserContainer from './components/UserProfile/VipStatus/AddVipUserContainer'
import UserPageContainer from './components/UserPage/UserPageContainer'
import { establishWebSocketConnection } from './components/Auth/UserStatus/UserStatus'
import { setAuthSuccess, updateUserOnlineStatus } from './redux/user-reducer/user-reducer'
import { fetchFavoriteTours, getAllUser, getUser } from './api_request/api'
import { getToursCatalog } from './redux/tour-reducer/tour-reducer'

function App({
  setAuthSuccess,
  getUser,
  isAuthenticated,
  getAllUser,
  fetchFavoriteTours,
  updateUserOnlineStatus,
  allUser,
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const userId = JSON.parse(localStorage.getItem('userId'))
        if (userId) {
          setAuthSuccess()
        }
        if (isAuthenticated) {
          await Promise.all([establishWebSocketConnection(), getAllUser(), fetchFavoriteTours(userId), getUser(userId)])
          updateUserOnlineStatus(userId, true)
        } else {
          await getAllUser()
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, getAllUser, getUser, fetchFavoriteTours, setAuthSuccess, updateUserOnlineStatus])

  if (isLoading) {
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
            <div className='contentGridBlock'>
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
  fetchFavoriteTours,
  updateUserOnlineStatus,
  getToursCatalog,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    allUser: state.user.allUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
