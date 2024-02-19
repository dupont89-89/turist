import axios from 'axios'
import { setAllDataUser, setDataUser } from '../redux/user-reducer/user-reducer'
import { setDataCountFavoriteTours, setDataFavoriteTours, setFavoriteTour } from '../redux/tour-reducer/tour-reducer'

const instance = axios.create({
  baseURL: 'https://localhost:5000',
  withCredentials: true, // Если вам нужно использовать куки или авторизацию с сервером
})

export const getSity = async () => {
  const response = await instance.get(`/api/city`)
  return response
}

export const newSetDataTours = async (newTours) => {
  try {
    const formData = new FormData()
    for (const key in newTours) {
      formData.append(key, newTours[key])
    }
    const response = await instance.post('/tours/newsetdatatours', formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/user/get-user?userId=${userId}`)
      const userData = response.data.userData
      // Dispatch the setDataUser action to update the user data in the Redux store
      dispatch(setDataUser(userData))
      return response.data
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error('Error fetching user data:', error)
    }
  }
}

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get('/user/get-all-user')
      const allUser = response.data
      // Dispatch the setDataUser action to update the user data in the Redux store
      dispatch(setAllDataUser(allUser))
      return response.data
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error('Error fetching user data:', error)
    }
  }
}

export const addUserAvatar = async (avatar, userId) => {
  const response = await instance.post(`/user/uploads-avatar?userId=${userId}`, avatar)
  return response.data
}

export const updateUserData = async (userId, updates) => {
  try {
    const response = await instance.patch(`user/uploads-data-user?userId=${userId}`, updates)
    // Обработка успешного ответа
    return response.data
  } catch (error) {
    // Обработка ошибок
    console.error('Error updating user data:', error)
    throw error
  }
}

export const getTours = async () => {
  const response = await instance.get('/tours/gettours')
  const tours = response.data
  return tours
}

export const signUpUser = async (userData) => {
  try {
    const response = await instance.post('user/signup', userData)
    return response.data
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('An error occurred while processing your request.')
    }
  }
}

export const loginUser = async (data) => {
  try {
    const response = await instance.post('user/auth', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const addTourFavoriteUser = async (userId, tourId, data) => {
  try {
    const response = await instance.post(`/tours/add-favorite-tour`, { userId, tourId, data })
    return response.data
  } catch (error) {
    console.error('Error adding tour to favorites:', error)
    throw error // Пробросить ошибку для дальнейшей обработки
  }
}

export const delTourFavoriteUser = async (userId, tourId) => {
  try {
    const response = await instance.post(`/tours/delete-favorite-tours`, { userId, tourId })
    return response.data
  } catch (error) {
    console.error('Error adding tour to favorites:', error)
    throw error // Пробросить ошибку для дальнейшей обработки
  }
}

export const fetchFavoriteTours = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/tours/favorite-tours/${userId}`)
      const favoriteTours = response.data
      // Dispatch the setFavoriteTours action to update the favorite tours data in the Redux store
      dispatch(setDataFavoriteTours(favoriteTours))
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error('Error fetching favorite tours:', error)
    }
  }
}

export const countFavoriteTours = (tourIdsArray) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(`/tours/favorite-tours-count`, { tourIds: tourIdsArray })
      const countTours = response.data.counts // Предполагая, что сервер возвращает объект с массивом counts
      // Dispatch the setFavoriteTours action to update the favorite tours data in the Redux store
      dispatch(setDataCountFavoriteTours(countTours))
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error('Error fetching favorite tours:', error)
    }
  }
}
