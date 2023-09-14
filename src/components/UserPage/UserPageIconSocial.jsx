import React from 'react'
import s from './UserPage.module.css'
import OK from './../../assets/images/UserPage/Icon/free-icon-odnoklassniki-3669991.png'
import TG from './../../assets/images/UserPage/Icon/free-icon-telegram-2111646 (1).png'
import VK from './../../assets/images/UserPage/Icon/free-icon-vk-145813 (1).png'
import WP from './../../assets/images/UserPage/Icon/free-icon-whatsapp-3670051 (1).png'
import { Link } from 'react-router-dom'
export default function UserPageIconSocial(props) {
    return (
        <div className={s.userPageSoialLink}>
            <p className={s.titleSocialLink}>Я в соц.сетях</p>
            <Link to="#"><img src={OK} alt="" /></Link>
            <Link to="#"><img src={TG} alt="" /></Link>
            <Link to="#"><img src={VK} alt="" /></Link>
            <Link to="#"><img src={WP} alt="" /></Link>
        </div>
    )
}