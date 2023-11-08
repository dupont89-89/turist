import React from 'react'
import s from './UserPage.module.css'

export default function UserPageName(props) {
    return (
        <div className={s.userPageNameBlock}>
            <div className={s.nameUser}>
            <span>{props.firstName} {props.lastName.charAt(0)}.</span>
            </div>
        </div>
    )
}