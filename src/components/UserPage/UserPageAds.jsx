import React from 'react'
import s from './../CartTour/CartTourCatalog.module.css'

import DataBlockCartList from '../CartTour/CartTourElements/DataToursCartList'
import NameUserCartList from '../CartTour/CartTourElements/NameUserCartList'
import AvatarUserCartList from '../CartTour/CartTourElements/AvatarUserCartList'
import DescriptionToursCartList from '../CartTour/CartTourElements/DescriptionToursCartList'
import ButtonItemToursCartList from '../CartTour/CartTourElements/ButtonItemToursCartList'
import LevelTrustUserCartList from '../CartTour/CartTourElements/LevelTrustUserCartList'
import FotoToursCartList from '../CartTour/CartTourElements/FotoToursCartList'
import IconSearchUsersToursCartList from '../CartTour/CartTourElements/IconSearchUsersToursCartList'
import WishLinkItemToursCartList from '../CartTour/CartTourElements/WishLinkItemToursCartList'
import RegionsUserCartList from '../CartTour/CartTourElements/RegionsUserCartList'
import RegionsBlockCartList from '../CartTour/CartTourElements/RegionsToursCartList'

export default function UserPageAds(props) {
  return (
    <div className={s.cartBlock}>
      <RegionsBlockCartList />
      <DataBlockCartList />
      <div className={s.descriptionCartBlock}>
        <div className={s.leftBlockCartList}>
          <AvatarUserCartList />
          <IconSearchUsersToursCartList />
        </div>
        <div className={s.rightBlockCartList}>
          <NameUserCartList />
          <LevelTrustUserCartList />
          <RegionsUserCartList />
          <div class={s.blockDescriptionCartList}>
            <FotoToursCartList />
            <DescriptionToursCartList />
          </div>
        </div>
      </div>
      <div className={s.linkBtnCartList}>
        <WishLinkItemToursCartList />
        <ButtonItemToursCartList />
      </div>
    </div>
  )
}
