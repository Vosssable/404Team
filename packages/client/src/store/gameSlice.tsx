import { createSlice } from '@reduxjs/toolkit'

interface GameState {
  status: 'OFF' | 'ON' | 'PAUSE' | 'END'
}

const initialState: GameState = {
  status: 'OFF',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: state => {
      state.status = 'ON'
    },
    pauseGame: state => {
      state.status = 'PAUSE'
    },
    endGame: state => {
      state.status = 'END'
    },
    resetGame: state => {
      state.status = 'OFF'
    },
  },
})

export const { startGame, pauseGame, endGame, resetGame } = gameSlice.actions
export default gameSlice.reducer
