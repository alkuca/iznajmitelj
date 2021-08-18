import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";
import notificationReducer from "./notificationReducer";

const reducers = combineReducers({
    itemsState: itemReducer,
    userState: userReducer,
    messageState: messageReducer,
    notificationState: notificationReducer
});

export default reducers;