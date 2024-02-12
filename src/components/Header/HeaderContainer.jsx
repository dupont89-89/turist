import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import s from './Header.module.css'

function HeaderContainer(props) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const avatar = useSelector((state) => state.user.dataUser.avatar)
  const firstName = useSelector((state) => state.user.dataUser.firstName)
  const lastName = useSelector((state) => state.user.dataUser.lastName)
  const userId = useSelector((state) => state.user.dataUser.userId)
  const vip = useSelector((state) => state.user.dataUser.vip)

  return (
    <div className={`${s.headerBackground} ${s.header}`}>
      <Header
        userId={userId}
        isAuthenticated={isAuthenticated}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        vip={vip}
      />
    </div>
  )
}

export default HeaderContainer
