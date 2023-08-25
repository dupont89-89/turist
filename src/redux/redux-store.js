import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from "redux";
import ThunkMiddleware from "redux-thunk";
import sityReducer from "./sity-reducer";

let reducers = combineReducers ({
    searchSityTrack: sityReducer,
}); 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

export default store