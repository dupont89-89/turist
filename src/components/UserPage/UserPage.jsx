import React from 'react'
import s from './UserPage.module.css'
import UserPageFoto from './UserPageFoto'
import UserPageName from './UserPageName'
import UserPageLevel from './UserPageLevel'
import SidebarUserPage from '../Sidebar/SidebarUserPage'
import UserPageIconSocial from './UserPageIconSocial'
import UserPageMessageBtn from './UserPageMessageBtn'
import UserPageAds from './UserPageAds'
import UserPageIconUserContent from './UserPageIconUserContent'

export default function UserPage(props) {
    debugger;
    return (
        <div className={s.contentUserPage}>
            <div className={s.userPageLeftBlock}>
                <div className={s.userPageBlock}>
                    {/* <div>
                        <UserPageFoto />
                    </div> */}
                    <div>
                        <UserPageName lastName={props.lastName} firstName={props.firstName} />
                        {/* <UserPageLevel />
                        <UserPageIconSocial />
                        <UserPageMessageBtn /> */}
                    </div>
                </div>
                <div className={s.userPageBlockUserContent}>
                    {/* <UserPageIconUserContent /> */}
                </div>
                <div className={s.titleMyAds}>
                    <h2>Мои объявления <span>(2)</span></h2>
                    <div>
                        {/* <UserPageAds /> */}
                    </div>
                </div>
            </div>
            <div>
                {/* <SidebarUserPage /> */}
            </div>
        </div>
    )
}