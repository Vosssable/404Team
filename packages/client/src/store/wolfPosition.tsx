import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type TKeyDownResponseEx } from '../pages/game/GameInterfaces'

const initialState: TKeyDownResponseEx = {
  position: 'Center',
  className: 'center',
  imageUrl: 'images/game-wolf-center.png',
}

const wolfPositionSlice = createSlice({
  name: 'wolfPosition',
  initialState,
  reducers: {
    setPosition(state, action: PayloadAction<TKeyDownResponseEx>) {
      return { ...state, ...action.payload }
    },
    useDefaultPosition(state) {
      state.position = 'Center'
      state.className = 'center'
      state.imageUrl = 'images/game-wolf-center.png'
    },
  },
})

export const { setPosition, useDefaultPosition } = wolfPositionSlice.actions
export default wolfPositionSlice.reducer
