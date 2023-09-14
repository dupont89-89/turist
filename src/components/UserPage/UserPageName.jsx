import React from 'react'
import s from './UserPage.module.css'

export default function UserPageName(props) {
    return (
        <div className={s.userPageNameBlock}>
            <div className={s.nameUser}>Дарья А.</div>
        </div>
    )
}