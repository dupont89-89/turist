import avatar from '../../assets/images/User/traveler.png'

const ACTION_USER_DATA = 'ACTION_USER_DATA'
const ACTION_ALL_USER_DATA = 'ACTION_ALL_USER_DATA'
const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const UPDATE_USER_ONLINE_STATUS = 'UPDATE_USER_ONLINE_STATUS'

export const setDataUser = (dataUser) => ({
  type: ACTION_USER_DATA,
  dataUser: { ...dataUser }, // Глубокое копирование dataUser
})

export const setAllDataUser = (allUser) => ({
  type: ACTION_ALL_USER_DATA,
  allUser: [...allUser], // Глубокое копирование массива allUser
})

export const setAuthSuccess = () => ({
  type: SET_AUTH_SUCCESS,
})

export const logout = () => ({
  type: LOGOUT,
})

export const updateUserOnlineStatus = (userId, isOnline) => ({
  type: UPDATE_USER_ONLINE_STATUS,
  payload: { userId, isOnline },
})

export const logoutUserThunkCreator = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
  localStorage.removeItem('userId')
  return (dispatch) => {
    dispatch(logout())
  }
}

const initialState = {
  dataUser: {
    avatar: avatar,
    firstName: 'Привет',
    lastName: 'Гость',
    vip: false,
  },
  allUser: [],
  isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_USER_DATA:
      return {
        ...state,
        dataUser: { ...action.dataUser }, // Глубокое копирование action.dataUser
      }
    case ACTION_ALL_USER_DATA:
      return {
        ...state,
        allUser: [...action.allUser], // Сохраняем как массив
      }
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        dataUser: { ...initialState.dataUser }, // Восстановление начального состояния dataUser
      }
    case UPDATE_USER_ONLINE_STATUS:
      // Проверяем, что allUser существует и является массивом
      if (state.allUser && Array.isArray(state.allUser)) {
        return {
          ...state,
          allUser: state.allUser.map((user) => {
            if (user._id === action.payload.userId) {
              return {
                ...user,
                isOnline: action.payload.isOnline,
              }
            }
            return user
          }),
        }
      } else {
        // Если allUser не существует или не является массивом, возвращаем исходное состояние
        return state
      }
    default:
      return state
  }
}

export default userReducer

// import avatar from '../../assets/images/User/traveler.png'

// const ACTION_USER_DATA = 'ACTION_USER_DATA'
// const ACTION_ALL_USER_DATA = 'ACTION_ALL_USER_DATA'
// const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS'
// const LOGOUT = 'LOGOUT'

// export const setDataUser = (dataUser) => ({
//   type: ACTION_USER_DATA,
//   dataUser,
// })

// export const setAllDataUser = (allUser) => ({
//   type: ACTION_ALL_USER_DATA,
//   allUser,
// })

// export const setAuthSuccess = () => {
//   return {
//     type: SET_AUTH_SUCCESS,
//   }
// }

// export const logout = () => {
//   // Удаляем токен из локального хранилища
//   return {
//     type: LOGOUT,
//   }
// }

// export const logoutUserThunkCreator = () => {
//   localStorage.removeItem('token')
//   localStorage.removeItem('userData')
//   localStorage.removeItem('userId')
//   return (dispatch) => {
//     dispatch(logout())
//   }
// }

// let initialState = {
//   dataUser: {
//     avatar: avatar,
//     firstName: 'Привет',
//     lastName: 'Гость',
//     vip: false,
//   },
//   allUser: {

//   },
//   isAuthenticated: false,
// }

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ACTION_USER_DATA:
//       return {
//         ...state,
//         dataUser: action.dataUser,
//       }
//       case ACTION_ALL_USER_DATA:
//         return {
//           ...state,
//           allUser: action.allUser,
//         }
//     case SET_AUTH_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//       }
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         dataUser: {
//           avatar: avatar,
//           firstName: 'Привет',
//           lastName: 'Гость',
//         },
//       }
//     // Здесь вы можете добавить другие кейсы для обновления данных пользователя, если это необходимо в будущем.
//     default:
//       return state
//   }
// }

// export default userReducer
