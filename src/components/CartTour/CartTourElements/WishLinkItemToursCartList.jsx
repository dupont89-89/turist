import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from '../CartTourCatalog.module.css'
import iconHealt from '../../../assets/images/cartTours/free-icon-favorite-11090394.png'
import iconHealtNo from '../../../assets/images/cartTours/icon-favorite-no.png'
import { addTourFavoriteUser, delTourFavoriteUser } from '../../../api_request/api'

export default function WishLinkItemToursCartList(props) {
  const { loginUserId, tourId, isFavorite, favoriteTourCounts, toursItem, countFavoriteTours, fetchFavoriteTours } =
    props
  const [count, setCount] = useState(favoriteTourCounts) // Используем useState для отслеживания количества

  useEffect(() => {
    // Обновляем состояние, если значение favoriteTourCounts изменилось
    setCount(favoriteTourCounts)
  }, [favoriteTourCounts])

  const data = 'Без комментариев'

  const countFavoriteToursHandler = () => {
    if (toursItem.length > 0) {
      const tourIdsArray = toursItem.map((tour) => tour._id)
      countFavoriteTours(tourIdsArray)
      fetchFavoriteTours(loginUserId)
    }
  }

  const addTour = () => {
    addTourFavoriteUser(loginUserId, tourId, data)
      .then(() => {
        countFavoriteToursHandler() // Вызов функции countFavoriteTours
      })
      .catch((error) => {
        console.error('Error adding tour to favorites:', error)
      })
  }

  const delTour = () => {
    delTourFavoriteUser(loginUserId, tourId)
      .then(() => {
        countFavoriteToursHandler() // Вызов функции countFavoriteTours
      })
      .catch((error) => {
        console.error('Error del tour to favorites:', error)
      })
  }

  // const addTour = () => {
  //   addTourFavoriteUser(loginUserId, tourId, data)
  //     .then(() => {
  //       fetchFavoriteTours(loginUserId)
  //     })
  //     .catch((error) => {
  //       console.error('Error adding tour to favorites:', error)
  //     })
  // }

  // const delTour = () => {
  //   delTourFavoriteUser(loginUserId, tourId)
  //     .then(() => {
  //       fetchFavoriteTours(loginUserId)
  //     })
  //     .catch((error) => {
  //       console.error('Error del tour to favorites:', error)
  //     })
  // }

  return (
    <div className={s.linkWishGridItemTours}>
      <div className={s.linkItemTours}>
        {isFavorite ? (
          <Link onClick={delTour} to='#'>
            <div className={s.blockIhave}>
              <img src={iconHealt} alt='' />
              <span className={s.numberWish}>{count}</span>
            </div>
          </Link>
        ) : (
          <Link onClick={addTour} to='#'>
            <div className={s.blockIhave}>
              <img src={iconHealtNo} alt='' />
              <span className={s.numberWish}>{count}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
