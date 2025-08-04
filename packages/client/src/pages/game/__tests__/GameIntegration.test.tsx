import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import GameWolfComponent from '../GameWolfComponent'
import GamePropertiesComponent from '../GamePropertiesComponent'
import wolfPositionReducer from '../../../store/wolfPosition'
import gamePropertiesReducer from '../../../store/gameProperties'

// Мокаем changeWolfPosition
jest.mock('../helpers/changeWolfPosition', () => ({
  __esModule: true,
  default: jest.fn(() => ({ top: 100, left: 200 })),
}))

const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: combineReducers({
      wolfPosition: wolfPositionReducer,
      gameProperties: gamePropertiesReducer,
    }),
    preloadedState: initialState,
  })
}

describe('Game Integration Tests', () => {
  const defaultGameState = {
    wolfPosition: {
      position: 'Center',
      className: 'center',
      imageUrl: 'images/game-wolf-center.png',
    },
    gameProperties: {
      score: 100,
      life: 3,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должен рендерить все игровые компоненты вместе', () => {
    const store = createMockStore(defaultGameState)

    render(
      <Provider store={store}>
        <div data-testid="game-container">
          <GamePropertiesComponent />
          <GameWolfComponent layoutWidth={800} layoutHeight={600} />
        </div>
      </Provider>
    )

    // Проверяем что GamePropertiesComponent рендерится
    expect(screen.getByText('Жизни:')).toBeInTheDocument()
    expect(screen.getByText('Счет:')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()

    // Проверяем что GameWolfComponent рендерится
    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toHaveClass('wolf-center')

    // Проверяем что контейнер существует
    expect(screen.getByTestId('game-container')).toBeInTheDocument()
  })

  it('должен отображать правильное количество жизней', () => {
    const store = createMockStore({
      ...defaultGameState,
      gameProperties: {
        score: 50,
        life: 2,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    const hearts = screen.getAllByText('❤️')
    expect(hearts).toHaveLength(2)
  })

  it('должен обновлять отображение при изменении состояния', () => {
    const store = createMockStore({
      ...defaultGameState,
      wolfPosition: {
        position: 'Left',
        className: 'left',
        imageUrl: 'images/game-wolf-moving.png',
      },
      gameProperties: {
        score: 200,
        life: 1,
      },
    })

    render(
      <Provider store={store}>
        <div>
          <GamePropertiesComponent />
          <GameWolfComponent layoutWidth={800} layoutHeight={600} />
        </div>
      </Provider>
    )

    // Проверяем обновленное состояние
    expect(screen.getByText('200')).toBeInTheDocument()
    const hearts = screen.getAllByText('❤️')
    expect(hearts).toHaveLength(1)

    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toHaveClass('wolf-left')
  })

  it('должен обрабатывать крайние случаи (0 жизней)', () => {
    const store = createMockStore({
      ...defaultGameState,
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
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('должен обрабатывать крайние случаи (максимум жизней)', () => {
    const store = createMockStore({
      ...defaultGameState,
      gameProperties: {
        score: 999,
        life: 5,
      },
    })

    render(
      <Provider store={store}>
        <GamePropertiesComponent />
      </Provider>
    )

    const hearts = screen.getAllByText('❤️')
    expect(hearts).toHaveLength(5)
    expect(screen.getByText('999')).toBeInTheDocument()
  })
})
