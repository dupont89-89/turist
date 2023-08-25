import React from 'react'
import s from './TourCatalog.module.css'
import SidebarToursList from '../Sidebar/SidebarToursList'
import CartTourCatalog from '../CartTour/CartTourCatalog'

export default function TourCatalog(props) {
    return (
        <div className={s.contentCartTours}>
            <div className={s.itemCartTours}>
                <CartTourCatalog />
                <CartTourCatalog />
                <CartTourCatalog />
                <CartTourCatalog />
                <CartTourCatalog />
                <CartTourCatalog />
            </div>
            <div className={s.SidebarBlockToursList}>
                <SidebarToursList />
            </div>
        </div>
    )
}
