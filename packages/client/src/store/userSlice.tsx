import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  id: number | null
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  avatar: string | null
  display_name: string | null
  isAuthChecked: boolean
}

const initialState: UserState = {
  id: null,
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: null,
  display_name: null,
  isAuthChecked: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload }
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
