import React from 'react'
import s from './TourCatalog.module.css'
import SidebarToursList from '../Sidebar/SidebarToursList'
import CartTourCatalog from '../CartTour/CartTourCatalog'

export default function TourCatalog(props) {
    
    let tours = props.toursItem
        .map(tour => <CartTourCatalog  
            id={tour.id} 
            key={tour.id} 
            name={tour.name} 
            surname={tour.surname} 
            age={tour.age} 
            city={tour.city} 
            avatar={tour.avatar}
            descriptionText={tour.description.text}
            descriptionImages={tour.description.images}
            goal={tour.goal}
            transport={tour.transport}
            favourites={tour.favourites}
            addFavouritesAction={props.addFavouritesAction}
            />);


    return (
        <div className={s.contentCartTours}>
            <div className={s.itemCartTours}>
                {/* <CartTourCatalog toursItem={props.toursItem} /> */}
                {tours}
            </div>
            <div className={s.SidebarBlockToursList}>
                <SidebarToursList />
            </div>
        </div>
    )
}
