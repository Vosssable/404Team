import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import GameWolfComponent from '../GameWolfComponent'
import wolfPositionReducer from '../../../store/wolfPosition'
import type { TKeyDownResponseEx } from '../GameInterfaces'

// Мокаем changeWolfPosition
jest.mock('../helpers/changeWolfPosition', () => ({
  __esModule: true,
  default: jest.fn(() => ({ top: 100, left: 200 })),
}))

const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: combineReducers({
      wolfPosition: wolfPositionReducer,
    }),
    preloadedState: initialState,
  })
}

describe('GameWolfComponent', () => {
  const defaultProps = {
    layoutWidth: 800,
    layoutHeight: 600,
  }

  const mockPosition: TKeyDownResponseEx = {
    position: 'Center',
    className: 'center',
    imageUrl: 'images/game-wolf-center.png',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должен рендерить волка с правильными стилями', () => {
    const store = createMockStore({
      wolfPosition: mockPosition,
    })

    render(
      <Provider store={store}>
        <GameWolfComponent {...defaultProps} />
      </Provider>
    )

    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toBeInTheDocument()
    expect(wolfElement).toHaveClass('wolf-center')
  })

  it('должен применять правильные размеры', () => {
    const store = createMockStore({
      wolfPosition: mockPosition,
    })

    render(
      <Provider store={store}>
        <GameWolfComponent {...defaultProps} />
      </Provider>
    )

    const wolfElement = screen.getByTestId('wolf-component')

    expect(wolfElement).toHaveStyle({
      width: '133.33333333333334px', // точное значение вместо округленного
      height: '200px', // 600 / 3
    })
  })

  it('должен применять правильный background-image', () => {
    const store = createMockStore({
      wolfPosition: mockPosition,
    })

    render(
      <Provider store={store}>
        <GameWolfComponent {...defaultProps} />
      </Provider>
    )

    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toHaveStyle({
      backgroundImage: 'url(images/game-wolf-center.png)',
    })
  })

  it('должен обновлять класс при изменении позиции', () => {
    const leftPosition: TKeyDownResponseEx = {
      position: 'Left',
      className: 'left',
      imageUrl: 'images/game-wolf-moving.png',
    }

    const store = createMockStore({
      wolfPosition: leftPosition,
    })

    render(
      <Provider store={store}>
        <GameWolfComponent {...defaultProps} />
      </Provider>
    )

    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toHaveClass('wolf-left')
  })

  it('должен работать с разными размерами layout', () => {
    const store = createMockStore({
      wolfPosition: mockPosition,
    })

    const customProps = {
      layoutWidth: 1920,
      layoutHeight: 1080,
    }

    render(
      <Provider store={store}>
        <GameWolfComponent {...customProps} />
      </Provider>
    )

    const wolfElement = screen.getByTestId('wolf-component')
    expect(wolfElement).toHaveStyle({
      width: '320px', // 1920 / 6
      height: '360px', // 1080 / 3
    })
  })
})
