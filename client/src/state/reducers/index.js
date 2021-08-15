import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
    itemsState: itemReducer,
    userState: userReducer,
    messageState: messageReducer
});

export default reducers;