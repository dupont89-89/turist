import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import s from './TourCatalog.module.css'
import CartTourCatalog from '../CartTour/CartTourCatalog'
import { calculateAge } from '../../function/userAge'
import { Link } from 'react-router-dom'

export default function TourCatalog(props) {
  const [isReversed, setIsReversed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  const tourCopyRevers = isReversed ? [...props.toursItem].reverse() : [...props.toursItem]

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

  let tours = tourCopyRevers.map((tour) => {
    const user = usersArray.find((user) => user._id === tour.userId) // Находим пользователя по userId
    const avatar = user ? user.avatar : '' // Получаем аватар пользователя
    const lastName = user ? user.lastName : '' // Получаем аватар пользователя
    const firstName = user ? user.firstName : '' // Получаем аватар пользователя
    const city = user ? user.city : '' // Получаем аватар пользователя
    const vip = user.vip
    let age = calculateAge(user.age)

    return (
      <CartTourCatalog
        age={age}
        key={tour._id}
        userId={tour.userId}
        toursId={tour._id}
        lastName={lastName}
        firstName={firstName}
        city={city}
        places={tour.places}
        avatar={avatar} // Передаем полученный аватар
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
        vip={vip}
      />
    )
  })

  return (
    <div className={s.contentCartTours}>
      <div className={s.itemCartTours}>
        <div className={s.blockFiltrBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span className={`${s.btnPoryadok}`}>
            <Link to='#'>Порядок отображения</Link>
          </span>
          {isHovered && (
            <div className={s.podMenuPorydok}>
              <Link onClick={toogleButtonNormal}>
                <span className={`${isReversed ? '' : s.hovered}`}>По дате добавления</span>
              </Link>
              <Link onClick={toogleButtonReverse}>
                <span className={`${isReversed ? s.hovered : ''}`}>Показать новые</span>
              </Link>
            </div>
          )}
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
