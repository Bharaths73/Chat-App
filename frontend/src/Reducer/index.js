import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Slices/AuthSlice'

const rootReducer=combineReducers({
    auth:authReducer,
})

export default rootReducer;