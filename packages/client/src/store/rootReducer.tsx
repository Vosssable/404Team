import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import gamePropertiesReducer from './gameProperties'
import wolfPositionReducer from './wolfPosition'

export default combineReducers({
  user: userReducer,
  wolfPosition: wolfPositionReducer,
  gameProperties: gamePropertiesReducer,
})
