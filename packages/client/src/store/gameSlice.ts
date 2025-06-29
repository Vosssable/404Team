import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type GameStatus = 'start' | 'in_progress' | 'end'

interface GameState {
  status: GameStatus
}

const initialState: GameState = {
  status: 'start',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.status = 'in_progress'
    },
    endGame(state) {
      state.status = 'end'
    },
    resetGame(state) {
      state.status = 'start'
    },
  },
})

export const { startGame, endGame, resetGame } = gameSlice.actions
export default gameSlice.reducer
