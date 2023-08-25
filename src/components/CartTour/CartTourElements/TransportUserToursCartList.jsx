import React from 'react'
import s from '../CartTourCatalog.module.css'
import iconAir from '../../../assets/images/cartTours/IconTransport/icon-plane-7234302.png'
import iconAuto from '../../../assets/images/cartTours/IconTransport/icon-suv-car-2060289.png'
import iconTrain from '../../../assets/images/cartTours/IconTransport/icon-train-1974098.png'

export default function TransportUserToursCartList(props) {
  return (
    <div className={s.blockTransport}>
      <div className={s.transportUserBlock}>
        Транспорт:
      </div>
      <div className={s.iconTransportUserBlock}>
        <img src={iconAir} alt="Самолётом" title="Самолётом" />
        <img src={iconAuto} alt="Автомобилем" title="Автомобилем"/>
        <img src={iconTrain} alt="Поездом" title="Поездом"/>
      </div>
    </div>

  )
}
