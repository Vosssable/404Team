import onGameKeyDown from '../onGameKeyDown'
import type { AppStore } from '../../../../store'

// Мокаем store
const mockStore = {
  dispatch: jest.fn(),
  getState: jest.fn(),
} as unknown as AppStore

describe('onGameKeyDown', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('обработка клавиш направления', () => {
    it('должен обрабатывать ArrowUp', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowUp' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать KeyW (W)', () => {
      const event = new KeyboardEvent('keydown', { code: 'KeyW' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать ArrowLeft', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Left')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать KeyA (A)', () => {
      const event = new KeyboardEvent('keydown', { code: 'KeyA' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Left')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать ArrowRight', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowRight' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать KeyD (D)', () => {
      const event = new KeyboardEvent('keydown', { code: 'KeyD' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowDown' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обрабатывать KeyS (S)', () => {
      const event = new KeyboardEvent('keydown', { code: 'KeyS' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
      expect(mockStore.dispatch).toHaveBeenCalled()
    })
  })

  describe('логика переходов между позициями', () => {
    it('должен переходить из Center в Right при нажатии Up', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowUp' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
    })

    it('должен переходить из Center в Left при нажатии Left', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Left')
    })

    it('должен переходить из Left в UpperLeft при нажатии Up', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowUp' })
      const previousPosition = 'Left'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('UpperLeft')
    })

    it('должен переходить из Right в UpperRight при нажатии Up', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowUp' })
      const previousPosition = 'Right'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('UpperRight')
    })

    it('должен переходить из UpperLeft в Left при нажатии Down', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowDown' })
      const previousPosition = 'UpperLeft'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Left')
    })

    it('должен переходить из UpperRight в Right при нажатии Down', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowDown' })
      const previousPosition = 'UpperRight'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('Right')
    })

    it('должен переходить из UpperRight в UpperLeft при нажатии Left', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
      const previousPosition = 'UpperRight'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('UpperLeft')
    })

    it('должен переходить из UpperLeft в UpperRight при нажатии Right', () => {
      const event = new KeyboardEvent('keydown', { code: 'ArrowRight' })
      const previousPosition = 'UpperLeft'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBe('UpperRight')
    })
  })

  describe('неизвестные клавиши', () => {
    it('должен возвращать undefined для неизвестной клавиши', () => {
      const event = new KeyboardEvent('keydown', { code: 'KeyX' })
      const previousPosition = 'Center'

      const result = onGameKeyDown(event, previousPosition, mockStore)

      expect(result).toBeUndefined()
      expect(mockStore.dispatch).not.toHaveBeenCalled()
    })
  })
})
