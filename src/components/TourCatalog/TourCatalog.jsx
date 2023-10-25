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
            places={tour.places}
            avatar={tour.avatar}
            text={tour.text}
            images={tour.images[0]}
            goal={tour.goal}
            level={tour.level}
            looking={tour.looking}
            train={tour.train}
            air={tour.air}
            car={tour.car}
            bike={tour.bike}
            foot={tour.foot}
            Ihave={tour.Ihave}
            total={tour.total}
            heshtag={tour.heshtag}
            selectedOptionData={tour.selectedOptionData}
            start_date={tour.start_date}
            end_date={tour.end_date}
            date={tour.date}
            favourites={tour.favourites}
            addFavouritesAction={props.addFavouritesAction}
            />);


    return (
        <div className={s.contentCartTours}>
            <div className={s.itemCartTours}>
                {tours}
            </div>
            <div className={s.SidebarBlockToursList}>
                <SidebarToursList />
            </div>
        </div>
    )
}
