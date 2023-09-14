import React from 'react'
import s from './UserPage.module.css'
import fotoOne from './../../assets/images/UserPage/UserFoto/id1/31a6105a8c835efaa1b3fe001f528dc7.jpg'
import fotoTwo from './../../assets/images/UserPage/UserFoto/id1/1342a461501b01ba815d0d1df51096c6_800x800.jpg'
import fotoTree from './../../assets/images/UserPage/UserFoto/id1/18689f17d765582e09e44ad7142c7b18_800x800.jpg'
export default function UserPageFoto(props) {
    return (
        <div className={s.userPageFotoBlock}>
            <div className={`${s.itemFotoUser} ${s.avatarUserPage}`}><img src={fotoOne} alt="" /></div>
            <div className={s.dopFotoUserPage}>
                <div className={s.itemFotoUser}><img src={fotoTwo} alt="" /></div>
                <div className={s.itemFotoUser}><img src={fotoTree} alt="" /></div>
            </div>
        </div>
    )
}