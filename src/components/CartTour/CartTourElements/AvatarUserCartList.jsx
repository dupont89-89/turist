import React from 'react'
import s from '../CartTourCatalog.module.css'

export default function AvatarUserCartList(props) {
  return (
    <div className={s.userAvatar}>
      <img src={props.avatar} alt="" />
    </div>
  )
}
