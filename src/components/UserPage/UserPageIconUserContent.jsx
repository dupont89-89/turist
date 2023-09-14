import React from 'react'
import s from './UserPage.module.css'
import Video from './../../assets/images/UserPage/Icon/free-icon-youtube-3670147.png'
import Blog from './../../assets/images/UserPage/Icon/free-icon-typewriter-7407924.png'
import Foto from './../../assets/images/UserPage/Icon/free-icon-photo-gallery-4503941.png'
import { Link } from 'react-router-dom'

export default function UserPageIconUserContent(props) {
    return (
        <div className={s.userPageIconUserContent}>
            <h2 className={s.titleIconUserContent}>Мои путешествия</h2>
            <div className={s.itemIcon}>
                <Link to="#"><img src={Video} alt="" /><span>Видеоотчёты</span></Link>
                <Link to="#"><img src={Blog} alt="" /><span>Мой блог</span></Link>
                <Link to="#"><img src={Foto} alt="" /><span>Фотоотчёты</span></Link>
            </div>
        </div>
    )
}