import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from "redux";
import ThunkMiddleware from "redux-thunk";
import sityReducer from "./sity-reducer";
import tourReducer from "./tour-reducer/tour-reducer";
import userReducer from "./user-reducer/user-reducer";

let reducers = combineReducers ({
    searchSityTrack: sityReducer,
    tours: tourReducer,
    user: userReducer,
}); 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

export default store