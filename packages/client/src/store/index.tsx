import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export function createStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<ReturnType<typeof createStore>['dispatch']>
