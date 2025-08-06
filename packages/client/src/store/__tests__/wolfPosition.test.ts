import wolfPositionSlice, {
  setPosition,
  useDefaultPosition,
} from '../wolfPosition'
import type { TKeyDownResponseEx } from '../../pages/game/GameInterfaces'

describe('wolfPositionSlice', () => {
  const initialState: TKeyDownResponseEx = {
    position: 'Center',
    className: 'center',
    imageUrl: 'images/game-wolf-center.png',
  }

  describe('начальное состояние', () => {
    it('должен иметь правильное начальное состояние', () => {
      const state = wolfPositionSlice(undefined, { type: 'unknown' })
      expect(state).toEqual(initialState)
    })
  })

  describe('setPosition', () => {
    it('должен обновить позицию волка', () => {
      const newPosition: TKeyDownResponseEx = {
        position: 'Left',
        className: 'left',
        imageUrl: 'images/game-wolf-moving.png',
      }

      const state = wolfPositionSlice(initialState, setPosition(newPosition))

      expect(state).toEqual(newPosition)
    })

    it('должен обновить позицию на Right', () => {
      const rightPosition: TKeyDownResponseEx = {
        position: 'Right',
        className: 'right',
        imageUrl: 'images/game-wolf-moving.png',
      }

      const state = wolfPositionSlice(initialState, setPosition(rightPosition))

      expect(state.position).toBe('Right')
      expect(state.className).toBe('right')
      expect(state.imageUrl).toBe('images/game-wolf-moving.png')
    })

    it('должен обновить позицию на UpperLeft', () => {
      const upperLeftPosition: TKeyDownResponseEx = {
        position: 'UpperLeft',
        className: 'left',
        imageUrl: 'images/game-wolf-moving.png',
      }

      const state = wolfPositionSlice(
        initialState,
        setPosition(upperLeftPosition)
      )

      expect(state.position).toBe('UpperLeft')
      expect(state.className).toBe('left')
    })
  })

  describe('useDefaultPosition', () => {
    it('должен сбросить позицию к начальному состоянию', () => {
      const currentState: TKeyDownResponseEx = {
        position: 'Right',
        className: 'right',
        imageUrl: 'images/game-wolf-moving.png',
      }

      const state = wolfPositionSlice(currentState, useDefaultPosition())

      expect(state.position).toBe('Center')
      expect(state.className).toBe('center')
      expect(state.imageUrl).toBe('images/game-wolf-center.png')
    })
  })
})
