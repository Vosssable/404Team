import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUser } from '../userSlice'
import type { AppDispatch, RootState } from '../index'
import { registration } from '../../api/registration'
import { authorization } from '../../api/authorization'

export const signUpThunk = createAsyncThunk<
  unknown,
  {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  },
  { dispatch: AppDispatch; state: RootState }
>('user/signUp', async (data, { dispatch }) => {
  const user = await registration(data)
  dispatch(setUser(user))
  return user
})

export const signInThunk = createAsyncThunk<
  string,
  { login: string; password: string },
  { dispatch: AppDispatch; state: RootState }
>('user/signIn', async (credentials, { dispatch }) => {
  await authorization(credentials.login, credentials.password)
  dispatch(setUser({ login: credentials.login }))
  return credentials.login
})

export const getUserThunk = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/getUser', async (_, { dispatch }) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      credentials: 'include',
      mode: 'cors',
    })
    if (!response.ok) throw new Error()
    const user = await response.json()
    dispatch(setUser({ ...user, isAuthChecked: true }))
  } catch {
    dispatch(
      setUser({
        id: null,
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        phone: '',
        avatar: null,
        display_name: null,
        isAuthChecked: true,
      })
    )
  }
})
