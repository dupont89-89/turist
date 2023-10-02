import React from 'react'
import s from '../CartTourCatalog.module.css'
import iconAir from '../../../assets/images/cartTours/IconTransport/icon-plane-7234302.png'
import iconAuto from '../../../assets/images/cartTours/IconTransport/icon-suv-car-2060289.png'
import iconTrain from '../../../assets/images/cartTours/IconTransport/icon-train-1974098.png'

export default function TransportUserToursCartList(props) {
  
  const { transport } = props; // Предполагается, что transport - это массив из пропсов

  return (
    <div className={s.blockTransport}>
      <div className={s.transportUserBlock}>Транспорт:</div>
      <div className={s.iconTransportUserBlock}>
        {transport.train && (
          <img src={iconTrain} alt="Поездом" title="Поездом" />
        )}
        {transport.air && (
          <img src={iconAir} alt="Самолётом" title="Самолётом" />
        )}
        {transport.car && (
          <img src={iconAuto} alt="Автомобилем" title="Автомобилем" />
        )}
        {/* {transport.bicycle && (
          <img src={iconBicycle} alt="Велосипедом" title="Велосипедом" />
        )} */}
      </div>
    </div>
  );
}
