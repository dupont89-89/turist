import React from 'react'
import s from './Sidebar.module.css'
import SidebarToursListOneBlock from './SidebarItemToursList/SidebarToursListOneBlock'
import SidebarToursListTwoBlock from './SidebarItemToursList/SidebarToursListTwoBlock'
import SidebarToursListThreeBlock from './SidebarItemToursList/SidebarToursListThreeBlock'
import SidebarToursListFourthBlock from './SidebarItemToursList/SidebarToursListFourthBlock'

export default function SidebarUserPage(props) {
    return (
        <div className={s.sidebar}>
            <SidebarToursListOneBlock />
            <SidebarToursListTwoBlock />
            <SidebarToursListThreeBlock/>
            <SidebarToursListFourthBlock />
        </div>
    )
}