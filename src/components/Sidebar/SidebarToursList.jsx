import React from 'react'
import s from './Sidebar.module.css'
import SidebarToursListOneBlock from './SidebarToursList/SidebarToursListOneBlock'
import SidebarToursListTwoBlock from './SidebarToursList/SidebarToursListTwoBlock'
import SidebarToursListThreeBlock from './SidebarToursList/SidebarToursListThreeBlock'
import SidebarToursListFourthBlock from './SidebarToursList/SidebarToursListFourthBlock'

export default function SidebarToursList(props) {
    return (
        <div className={s.sidebarToursList}>
            <SidebarToursListOneBlock />
            <SidebarToursListTwoBlock />
            <SidebarToursListThreeBlock />
            <SidebarToursListFourthBlock />
        </div>
    )
}