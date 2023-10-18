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
      <DataBlockCartList start_date={props.start_date} end_date={props.end_date} />
      <div className={s.descriptionCartBlock}>
        <div className={s.leftBlockCartList}>
          <AvatarUserCartList avatar={props.avatar} />
          <IconSearchUsersToursCartList looking={props.looking} />
        </div>
        <div className={s.rightBlockCartList}>
          <NameUserCartList id={props.id} name={props.name} surname={props.surname} />
          <LevelTrustUserCartList />
          <RegionsUserCartList city={props.city} age={props.age} />
          <div className={s.blockDescriptionCartList}>
            <FotoToursCartList images={props.images} />
            <DescriptionToursCartList foot={props.foot} bike={props.bike} car={props.car} air={props.air} train={props.train} goal={props.goal} text={props.text} />
          </div>
        </div>
      </div>
      <div className={s.linkBtnCartList}>
        <WishLinkItemToursCartList tourId={props.id} addFavouritesAction={props.addFavouritesAction} Ihave={props.Ihave} total={props.total} />
        <ButtonItemToursCartList />
      </div>
    </div>
  )
}
