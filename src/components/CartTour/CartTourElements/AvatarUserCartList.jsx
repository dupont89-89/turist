import React from 'react'
import s from '../CartTourCatalog.module.css'

export default function AvatarUserCartList(props) {
  return (
    <div className={props.vip ? s.userAvatarVip : s.userAvatar}>
      <img src={props.avatar} alt='' />
    </div>
  )
}
