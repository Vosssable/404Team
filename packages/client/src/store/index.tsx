import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import type { Store } from '@reduxjs/toolkit'

export function createStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>
