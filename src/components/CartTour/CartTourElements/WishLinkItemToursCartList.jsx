import React from 'react'
import { Link } from 'react-router-dom'
import s from '../CartTourCatalog.module.css'
import iconHealt from '../../../assets/images/cartTours/free-icon-favorite-11090394.png'
import iconHealtNo from '../../../assets/images/cartTours/icon-favorite-no.png'
import { addTourFavoriteUser } from '../../../api_request/api'

export default function WishLinkItemToursCartList(props) {
  const { loginUserId, tourId, fetchFavoriteTours, favorites, favoriteTourCounts } = props

  const data = 'Без комментариев'

  const addTour = () => {
    addTourFavoriteUser(loginUserId, tourId, data)
      .then(() => {
        // Если добавление тура в избранное прошло успешно, вызываем fetchFavoriteTours
        fetchFavoriteTours(loginUserId)
      })
      .catch((error) => {
        console.error('Error adding tour to favorites:', error)
      })
  }

  return (
    <div className={s.linkWishGridItemTours}>
      <div className={s.linkItemTours}>
        <Link onClick={addTour} to='#'>
          {favorites ? (
            <div className={s.blockIhave}>
              <img src={iconHealt} alt='' />
              <span className={s.numberWish}>{favoriteTourCounts}</span>
            </div>
          ) : (
            <div className={s.blockIhave}>
              <img src={iconHealtNo} alt='' />
              <span className={s.numberWish}>{favoriteTourCounts}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}
