import React from 'react'
import s from './UserPage.module.css'
import ButtonAction from '../Buttons/ButtonAction'

export default function UserPageMessageBtn(props) {
    return (
        <div className={s.userPageMessageBtn}>
            <ButtonAction type='button'>Написать</ButtonAction>
        </div>
    )
}