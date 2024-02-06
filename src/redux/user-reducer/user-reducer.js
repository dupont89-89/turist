import avatar from '../../assets/images/User/traveler.png'

const ACTION_USER_DATA = 'ACTION_USER_DATA '
const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

export const setDataUser = (dataUser) => ({
  type: ACTION_USER_DATA,
  dataUser,
})

export const setAuthSuccess = () => {
  return {
    type: SET_AUTH_SUCCESS,
  }
}

// export const logout = () => {
//   // Удаляем токен из локального хранилища
//   localStorage.removeItem('token');
//   localStorage.removeItem('userData');
//   localStorage.removeItem('userId');
//   return {
//     type: LOGOUT,
//   };
// };

export const logout = () => {
  // Удаляем токен из локального хранилища
  return {
    type: LOGOUT,
  }
}

export const logoutUserThunkCreator = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
  localStorage.removeItem('userId')
  return (dispatch) => {
    dispatch(logout())
  }
}

let initialState = {
  dataUser: {
    avatar: avatar,
    firstName: 'Привет',
    lastName: 'Гость',
    vip: false,
  },
  isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_USER_DATA:
      return {
        ...state,
        dataUser: action.dataUser,
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
        dataUser: {
          avatar: avatar,
          firstName: 'Привет',
          lastName: 'Гость',
        },
      }
    // Здесь вы можете добавить другие кейсы для обновления данных пользователя, если это необходимо в будущем.
    default:
      return state
  }
}

export default userReducer
