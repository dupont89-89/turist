import React, { useState } from 'react'
import s from './TourCatalog.module.css'
import CartTourCatalog from '../CartTour/CartTourCatalog'
import ButtonFiltr from '../Buttons/ButtonFiltr'
import { calculateAge } from '../../function/userAge'

export default function TourCatalog(props) {
  const [isReversed, setIsReversed] = useState(false)

  const tourCopyRevers = isReversed ? [...props.toursItem].reverse() : [...props.toursItem]

  const toogleButton = () => {
    setIsReversed(!isReversed)
  }

  let tours = tourCopyRevers.map((tour) => {
    let age = calculateAge(tour.age) // Используем функцию calculateAge
    return (
      <CartTourCatalog
        age={age} // Добавляем рассчитанный возраст
        key={tour._id}
        userId={tour.userId}
        toursId={tour._id}
        lastName={tour.lastName}
        firstName={tour.firstName}
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
      />
    )
  })
  return (
    <div className={s.contentCartTours}>
      <div className={s.itemCartTours}>
        <div className={s.blockFiltrBtn}>
          <span className={s.btnTitle}>Порядок отображеня</span>
          <ButtonFiltr onClick={toogleButton}>
            {isReversed ? <span>По дате добавления</span> : <span>Показать новые</span>}
          </ButtonFiltr>
        </div>
        {tours}
      </div>
    </div>
  )
}
