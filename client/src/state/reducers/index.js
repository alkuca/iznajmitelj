import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import userReducer from "./userReducer";

const reducers = combineReducers({
    itemsState: itemReducer,
    userState: userReducer
});

export default reducers;