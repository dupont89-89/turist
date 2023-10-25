
import Cookies from 'js-cookie';

const ACTION_USER_DATA = "ACTION_USER_DATA ";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS"
const LOGOUT = "LOGOUT"

export const setDataDataUser = (dataUser) => ({
  type: ACTION_USER_DATA, dataUser
});

export const setAuthSuccess = () => {
  return {
    type: SET_AUTH_SUCCESS,
  };
};

export const logout = () => {
  // Удаляем токен из локального хранилища
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};

let initialState = {
  dataUser: [],
  isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_USER_DATA:
      return {
        ...state,
        dataUser: action.dataUser,
      };
    case SET_AUTH_SUCCESS:
      debugger;
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        dataUser: null, // Обнулите данные пользователя
      };
    // Здесь вы можете добавить другие кейсы для обновления данных пользователя, если это необходимо в будущем.
    default:
      return state;
  }
};

export default userReducer;