import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  login: string | null
  first_name?: string
  second_name?: string
  email?: string
  phone?: string
}

const initialState: UserState = {
  login: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload }
    },
    clearUser(state) {
      state.login = null
      state.first_name = undefined
      state.second_name = undefined
      state.email = undefined
      state.phone = undefined
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
