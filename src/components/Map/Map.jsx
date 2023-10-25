import { YMaps, Map } from '@pbe/react-yandex-maps';

import React from 'react'

const MapCart = () => (
    <YMaps>
      <div>
      Это твоя карта дружок
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
      </div>
    </YMaps>
  );

export default MapCart