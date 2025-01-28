import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Slices/AuthSlice'
import chatReducer from '../Slices/ChatSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    chat:chatReducer,
})

export default rootReducer;