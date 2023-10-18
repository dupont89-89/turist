import React from 'react'
import s from '../CartTourCatalog.module.css'
import iconAir from '../../../assets/images/cartTours/IconTransport/icon-aeroplane-223465.png'
import iconAuto from '../../../assets/images/cartTours/IconTransport/icon-suv-4391528.png'
import iconTrain from '../../../assets/images/cartTours/IconTransport/icon-train-821405.png'
import iconBike from '../../../assets/images/cartTours/IconTransport/icon-mountain-bike-1947489.png'
import iconFoot from '../../../assets/images/cartTours/IconTransport/icon-hiking-5987640.png'

export default function TransportUserToursCartList(props) {

  return (
    <div className={s.blockTransport}>
      <div className={s.transportUserBlock}>Транспорт:</div>
      <div className={s.iconTransportUserBlock}>
        {props.train && (
          <img src={iconTrain} alt="Поездом" title="Поездом" />
        )}
        {props.air && (
          <img src={iconAir} alt="Самолётом" title="Самолётом" />
        )}
        {props.car && (
          <img src={iconAuto} alt="Автомобилем" title="Автомобилем" />
        )}
        {props.bike && (
          <img src={iconBike} alt="Велосипедом" title="Велосипедом" />
        )}
        {props.foot && (
          <img src={iconFoot} alt="Велосипедом" title="Велосипедом" />
        )}
      </div>
    </div>
  );
}
