import React from 'react'
import s from '../CartTourCatalog.module.css'
import avatar from  '../../../assets/images/cartTours/UsersAvatar/Lionesse-Easy-Campout-Hair.jpg'

export default function AvatarUserCartList(props) {
  return (
    <div className={s.userAvatar}>
      <img src={avatar} alt="" />
    </div>
  )
}
