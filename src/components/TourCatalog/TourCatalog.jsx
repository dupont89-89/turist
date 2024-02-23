import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './TourCatalog.module.css'
import CartTourCatalog from '../CartTour/CartTourCatalog'
import { calculateAge } from '../../function/userAge'
import { Link } from 'react-router-dom'
import ButtonMinIcon from '../Buttons/ButtonMinIcon'
import vipIcon from '../../assets/images/icon/button/vip.png'
import poryadokIcon from '../../assets/images/icon/button/free-icon-workflow-6020301.png'

export default function TourCatalog({
  toursItem,
  countFavoriteTours,
  fetchFavoriteTours,
  favorites,
  loginUserId,
  favoriteTourCounts,
  isAuthenticated,
  vip,
}) {
  // const { fetchFavoriteTours, favorites, loginUserId, favoriteTourCounts } = props;
  const [isReversed, setIsReversed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // useEffect(() => {
  //   if (toursItem.length > 0) {
  //     const tourIdsArray = toursItem.map((tour) => tour._id)
  //     countFavoriteTours(tourIdsArray)
  //   }
  // }, [toursItem, countFavoriteTours])

  // Остальной код компонента остается без изменений

  useEffect(() => {
    if (toursItem.length > 0) {
      const tourIdsArray = toursItem.map((tour) => tour._id)
      countFavoriteTours(tourIdsArray)
    }
  }, [toursItem, countFavoriteTours]) // Здесь добавлен countFavoriteTours в зависимости массива

  // if (toursItem.length > 0) {
  //   const tourIdsArray = toursItem.map((tour) => tour._id)
  //   countFavoriteTours(tourIdsArray)
  // }

  const users = useSelector((state) => state.user.allUser) // Получаем всех пользователей из Redux состояния
  const usersArray = Object.values(users)
  // Проверяем, что пользователи загружены и массив не пустой
  if (!users || users.length === 0) {
    return <div>Loading...</div> // Или какой-то другой индикатор загрузки
  }

  // Проверяем, что users является массивом
  if (!Array.isArray(usersArray)) {
    console.error('users is not an array:', usersArray)
    // Можете выполнить какие-то дополнительные действия или вернуть сообщение об ошибке
    return null // Или какое-то другое действие, в зависимости от вашей логики
  }

  // После useEffect следует ваш основной код компонента

  const tourCopyRevers = isReversed ? [...toursItem].reverse() : [...toursItem]

  const toogleButtonReverse = () => {
    setIsReversed(true)
  }

  const toogleButtonNormal = () => {
    setIsReversed(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  let tourCountsMap = {}
  favoriteTourCounts.forEach((item) => {
    tourCountsMap[item._id] = item.count
  })

  let tours = tourCopyRevers.map((tour) => {
    const user = usersArray.find((user) => user._id === tour.userId)
    const avatar = user ? user.avatar : ''
    const lastName = user ? user.lastName : ''
    const firstName = user ? user.firstName : ''
    const sity = user ? user.sity : ''
    const vip = user.vip
    let age = calculateAge(user.age)

    let isFavorite = favorites.some((favorite) => favorite.userId === loginUserId && favorite.tourId === tour._id)
    let countfavoriteTourCounts = tourCountsMap[tour._id] || 0 // Получаем количество добавлений в избранное для текущего тура

    return (
      <CartTourCatalog
        isFavorite={isFavorite}
        loginUserId={loginUserId}
        age={age}
        key={tour._id}
        userId={tour.userId}
        tourId={tour._id}
        lastName={lastName}
        firstName={firstName}
        sity={sity}
        places={tour.places}
        avatar={avatar}
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
        fetchFavoriteTours={fetchFavoriteTours}
        vip={vip}
        countfavoriteTourCounts={countfavoriteTourCounts}
        toursItem={toursItem}
        countFavoriteTours={countFavoriteTours}
        isAuthenticated={isAuthenticated}
      />
    )
  })

  return (
    <div className={s.contentCartTours}>
      <div className={s.itemCartTours}>
        <div className={s.buttonHeadListTour}>
          {!vip ? (
            <ButtonMinIcon link='/add-vip/' icon={vipIcon} backColor='#1e5b9f' textColor='#fff'>
              Получить VIP
            </ButtonMinIcon>
          ) : null}
          <div className={s.blockFiltrBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className={`${s.btnPoryadok}`}>
              <Link to='#dataTour'>
                <img className={s.imgIconButton} src={poryadokIcon} alt='Порядок отображения' />
                <span>Порядок туров</span>
              </Link>
            </span>
            {isHovered && (
              <div className={s.podMenuPorydok}>
                <Link to='#maxData' onClick={toogleButtonNormal}>
                  <span className={`${isReversed ? '' : s.hovered}`}>По дате добавления</span>
                </Link>
                <Link to='#minData' onClick={toogleButtonReverse}>
                  <span className={`${isReversed ? s.hovered : ''}`}>Показать новые</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        {tours}
      </div>
    </div>
  )
}

// import React, { useState } from 'react'
// import s from './TourCatalog.module.css'
// import CartTourCatalog from '../CartTour/CartTourCatalog'
// import ButtonFiltr from '../Buttons/ButtonFiltr'
// import { calculateAge } from '../../function/userAge'
// import { Link } from 'react-router-dom'

// export default function TourCatalog(props) {
//   const [isReversed, setIsReversed] = useState(false)
//   const [isHovered, setIsHovered] = useState(false)

//   const tourCopyRevers = isReversed ? [...props.toursItem].reverse() : [...props.toursItem]

//   const toogleButtonReverse = () => {
//     setIsReversed(true)
//   }

//   const toogleButtonNormal = () => {
//     setIsReversed(false)
//   }

//   const handleMouseEnter = () => {
//     setIsHovered(true)
//   }

//   const handleMouseLeave = () => {
//     setIsHovered(false)
//   }

//   console.log(isHovered)

//   let tours = tourCopyRevers.map((tour) => {
//     let age = calculateAge(tour.age) // Используем функцию calculateAge
//     return (
//       <CartTourCatalog
//         age={age} // Добавляем рассчитанный возраст
//         key={tour._id}
//         userId={tour.userId}
//         toursId={tour._id}
//         lastName={tour.lastName}
//         firstName={tour.firstName}
//         city={tour.city}
//         places={tour.places}
//         avatar={tour.avatar}
//         text={tour.text}
//         images={tour.images[0]}
//         goal={tour.goal}
//         level={tour.level}
//         looking={tour.looking}
//         train={tour.train}
//         air={tour.air}
//         car={tour.car}
//         bike={tour.bike}
//         foot={tour.foot}
//         Ihave={tour.Ihave}
//         total={tour.total}
//         heshtag={tour.heshtag}
//         selectedOptionData={tour.selectedOptionData}
//         start_date={tour.start_date}
//         end_date={tour.end_date}
//         date={tour.date}
//         favourites={tour.favourites}
//         addFavouritesAction={props.addFavouritesAction}
//       />
//     )
//   })
//   return (
//     <div className={s.contentCartTours}>
//       <div className={s.itemCartTours}>
//         <div className={s.blockFiltrBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//           <span className={`${s.btnPoryadok}`}>
//             <Link to='#'>Порядок отображения</Link>
//           </span>
//           {isHovered && (
//             <div className={s.podMenuPorydok}>
//               <Link onClick={toogleButtonNormal}>
//                 <span className={`${isReversed ? '' : s.hovered}`}>По дате добавления</span>
//               </Link>
//               <Link onClick={toogleButtonReverse}>
//                 <span className={`${isReversed ? s.hovered : ''}`}>Показать новые</span>
//               </Link>
//             </div>
//           )}
//         </div>
//         {tours}
//       </div>
//     </div>
//   )
// }
