import { getTours } from '../../api_request/api'

const ACTION_SET_FAVOURITES = 'ACTION_SET_FAVOURITES'
const ACTION_DATA_SET_FAVOURITES = 'ACTION_DATA_SET_FAVOURITES'
const ACTION_SET_TOURS = 'ACTION_SET_TOURS'
const ACTION_COUNT_SET_FAVOURITES = 'ACTION_COUNT_SET_FAVOURITES'

export const setFavoriteTour = (userId, tourId, data) => ({ type: ACTION_SET_FAVOURITES, userId, tourId, data })
export const setToursState = (tours) => ({ type: ACTION_SET_TOURS, tours })
export const setDataFavoriteTours = (favoriteTours) => ({ type: ACTION_DATA_SET_FAVOURITES, favoriteTours })
export const setDataCountFavoriteTours = (countTour) => ({ type: ACTION_COUNT_SET_FAVOURITES, countTour })

let initialState = {
  toursItem: [],
  favorites: [],
  favoriteTourCounts: [],
}

export const getToursCatalog = () => {
  return (dispatch) => {
    getTours().then((response) => {
      dispatch(setToursState(response))
    })
  }
}

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_TOURS: {
      return { ...state, toursItem: action.tours }
    }
    case ACTION_DATA_SET_FAVOURITES: {
      // Получаем массив объектов из favoriteTours
      const favoriteToursArray = action.favoriteTours.favoriteTours
      return { ...state, favorites: favoriteToursArray }
    }
    case ACTION_COUNT_SET_FAVOURITES: {
      return { ...state, favoriteTourCounts: action.countTour }
    }
    default:
      return state
  }
}

export default tourReducer
