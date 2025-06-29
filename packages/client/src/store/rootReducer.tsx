import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import gameReducer from './gameSlice'

export default combineReducers({
  user: userReducer,
  game: gameReducer,
})
