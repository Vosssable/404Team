import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import GamePropertiesComponent from '../GamePropertiesComponent'
import gamePropertiesReducer from '../../../store/gameProperties'

const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: combineReducers({
      gameProperties: gamePropertiesReducer,
    }),
    preloadedState: initialState,
  })
}

describe('GamePropertiesComponent', () => {
  it('должен отображать правильное количество жизней', () => {
    const store = createMockStore({
      gameProperties: {
        score: 100,
        life: 3,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    const hearts = screen.getAllByText('❤️')
    expect(hearts).toHaveLength(3)
  })

  it('должен отображать правильный счет', () => {
    const store = createMockStore({
      gameProperties: {
        score: 250,
        life: 2,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    expect(screen.getByText('Счет:')).toBeInTheDocument()
    expect(screen.getByText('250')).toBeInTheDocument()
  })

  it('должен отображать 0 жизней', () => {
    const store = createMockStore({
      gameProperties: {
        score: 0,
        life: 0,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    const hearts = screen.queryAllByText('❤️')
    expect(hearts).toHaveLength(0)
  })

  it('должен отображать 1 жизнь', () => {
    const store = createMockStore({
      gameProperties: {
        score: 50,
        life: 1,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    const hearts = screen.getAllByText('❤️')
    expect(hearts).toHaveLength(1)
  })

  it('должен отображать текст "Жизни:"', () => {
    const store = createMockStore({
      gameProperties: {
        score: 0,
        life: 3,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    expect(screen.getByText('Жизни:')).toBeInTheDocument()
  })

  it('должен иметь правильную структуру DOM', () => {
    const store = createMockStore({
      gameProperties: {
        score: 100,
        life: 2,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    // Используем getByText для поиска элемента с классом game-header
    const gameHeader = screen.getByText('Жизни:').closest('.game-header')
    expect(gameHeader).toHaveClass('game-header')
  })
})
