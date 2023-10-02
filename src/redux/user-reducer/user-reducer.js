import { getUser } from "../../api_request/api";

const ACTION_GET_USER = "ACTION_GET_USER";

export const setDataProfile = (user) => ({
  type: ACTION_GET_USER, user
});

export const getUserClerk = (userId) => {
  debugger;
  return (dispatch) => {
    debugger;
    getUser(userId).then(response => {
      dispatch(setDataProfile(response));
    });
  }
}

let initialState = {
  user: null, // Изначально устанавливаем значение user как null или пустой объект, в зависимости от ваших требований.
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_USER:
      debugger;
      return {
        ...state,
        user: action.user,
      };
    // Здесь вы можете добавить другие кейсы для обновления данных пользователя, если это необходимо в будущем.
    default:
      return state;
  }
};

export default userReducer;