import { getSity } from "../api_request/api";

const ACTION_SET_SITY = "ACTION_SET_SITY";

export const addSity = (city) => ({ type: ACTION_SET_SITY, city })

let initialState = {
    city: [
    ],
}

export const getSitySearch = () => {
    return (dispatch) => {
        getSity().then(response => {  
           dispatch(addSity(response.data.data.city));
        });
    }
}

const sityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_SITY: {
            return { ...state, city: action.city} 
        }
        default:
            return state;
    }
}

export default sityReducer;