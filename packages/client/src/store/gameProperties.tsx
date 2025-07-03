import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type TGameProperties } from '../components/game/GameInterfaces'

const initialState: TGameProperties = {
  score: 0,
  life: 3,
}

const gamePropertiesSlice = createSlice({
  name: 'gameProperties',
  initialState,
  reducers: {
    setProperties(state, action: PayloadAction<TGameProperties>) {
      return { ...state, ...action.payload }
    },
    useDefaultProperties(state) {
      state.life = 3
      state.score = 0
    },
  },
})

export const { setProperties, useDefaultProperties } =
  gamePropertiesSlice.actions
export default gamePropertiesSlice.reducer
