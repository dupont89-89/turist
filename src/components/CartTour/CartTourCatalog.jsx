import React from 'react'
import s from './CartTourCatalog.module.css'
import RegionsBlockCartList from './CartTourElements/RegionsToursCartList'
import DataBlockCartList from './CartTourElements/DataToursCartList'
import NameUserCartList from './CartTourElements/NameUserCartList'
import RegionsUserCartList from './CartTourElements/RegionsUserCartList'
import AvatarUserCartList from './CartTourElements/AvatarUserCartList'
import DescriptionToursCartList from './CartTourElements/DescriptionToursCartList'
import ButtonItemToursCartList from './CartTourElements/ButtonItemToursCartList'
import LevelTrustUserCartList from './CartTourElements/LevelTrustUserCartList'
import FotoToursCartList from './CartTourElements/FotoToursCartList'
import IconSearchUsersToursCartList from './CartTourElements/IconSearchUsersToursCartList'
import WishLinkItemToursCartList from './CartTourElements/WishLinkItemToursCartList'
import SidebarToursList from '../Sidebar/SidebarToursList'

export default function CartTourCatalog(props) {
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
