import gamePropertiesSlice, {
  setProperties,
  useDefaultProperties,
} from '../gameProperties'
import type { TGameProperties } from '../../pages/game/GameInterfaces'

describe('gamePropertiesSlice', () => {
  const initialState: TGameProperties = {
    score: 0,
    life: 3,
  }

  describe('начальное состояние', () => {
    it('должен иметь правильное начальное состояние', () => {
      const state = gamePropertiesSlice(undefined, { type: 'unknown' })
      expect(state).toEqual(initialState)
    })
  })

  describe('setProperties', () => {
    it('должен обновить свойства игры', () => {
      const newProperties: TGameProperties = {
        score: 100,
        life: 2,
      }

      const state = gamePropertiesSlice(
        initialState,
        setProperties(newProperties)
      )

      expect(state).toEqual(newProperties)
    })

    it('должен обновить только score', () => {
      const scoreUpdate: TGameProperties = {
        score: 50,
        life: 3,
      }

      const state = gamePropertiesSlice(
        initialState,
        setProperties(scoreUpdate)
      )

      expect(state.score).toBe(50)
      expect(state.life).toBe(3)
    })

    it('должен обновить только life', () => {
      const lifeUpdate: TGameProperties = {
        score: 0,
        life: 1,
      }

      const state = gamePropertiesSlice(initialState, setProperties(lifeUpdate))

      expect(state.score).toBe(0)
      expect(state.life).toBe(1)
    })

    it('должен обновить свойства с частичными данными', () => {
      const partialUpdate = {
        score: 25,
      }

      const state = gamePropertiesSlice(
        initialState,
        setProperties(partialUpdate as TGameProperties)
      )

      expect(state.score).toBe(25)
      expect(state.life).toBe(3) // должно остаться неизменным
    })
  })

  describe('useDefaultProperties', () => {
    it('должен сбросить свойства к начальному состоянию', () => {
      const currentState: TGameProperties = {
        score: 150,
        life: 1,
      }

      const state = gamePropertiesSlice(currentState, useDefaultProperties())

      expect(state.score).toBe(0)
      expect(state.life).toBe(3)
    })

    it('должен сбросить свойства когда life равен 0', () => {
      const currentState: TGameProperties = {
        score: 200,
        life: 0,
      }

      const state = gamePropertiesSlice(currentState, useDefaultProperties())

      expect(state.score).toBe(0)
      expect(state.life).toBe(3)
    })
  })
})
