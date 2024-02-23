import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TourCatalog from './TourCatalog'
import { getToursCatalog } from '../../redux/tour-reducer/tour-reducer'
import { countFavoriteTours, fetchFavoriteTours } from '../../api_request/api'

function ContainerTourCatalog(props) {
  useEffect(() => {
    document.title = 'Поиск попутчиков, туров, искать друзей для путешествия'
    // Вызываем загрузку туров при монтировании компонента
    props.getToursCatalog()
  }, [])

  return (
    <div>
      <TourCatalog
        loginUserId={props.loginUserId}
        favorites={props.favorites}
        toursItem={props.toursItem}
        fetchFavoriteTours={props.fetchFavoriteTours}
        countFavoriteTours={props.countFavoriteTours}
        favoriteTourCounts={props.favoriteTourCounts}
        isAuthenticated={props.isAuthenticated}
        vip={props.vip}
      />
    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    toursItem: state.tours.toursItem,
    loginUserId: state.user.dataUser.userId,
    vip: state.user.dataUser.vip,
    favorites: state.tours.favorites,
    favoriteTourCounts: state.tours.favoriteTourCounts,
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavoriteTours: (loginUserId) => {
      dispatch(fetchFavoriteTours(loginUserId))
    },
    countFavoriteTours: (tourIdsArray) => {
      dispatch(countFavoriteTours(tourIdsArray))
    },
    getToursCatalog: () => {
      dispatch(getToursCatalog())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTourCatalog)
