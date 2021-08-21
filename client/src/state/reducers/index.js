import { combineReducers } from 'redux';
import itemReducer from './itemReducer'
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";
import notificationReducer from "./notificationReducer";
import uiReducer from "./uiReducer";

const reducers = combineReducers({
    itemsState: itemReducer,
    userState: userReducer,
    messageState: messageReducer,
    notificationState: notificationReducer,
    uiState: uiReducer
});

export default reducers;