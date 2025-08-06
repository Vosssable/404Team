import changeWolfPosition from '../changeWolfPosition'
import type { TKeyDownResponseEx } from '../../GameInterfaces'

describe('changeWolfPosition', () => {
  const mockPosition: TKeyDownResponseEx = {
    position: 'Center',
    className: 'center',
    imageUrl: 'images/game-wolf-center.png',
  }

  const canvasWidth = 800
  const canvasHeight = 600

  describe('позиционирование волка', () => {
    it('должен правильно позиционировать волка в центре', () => {
      const centerPosition: TKeyDownResponseEx = {
        ...mockPosition,
        position: 'Center',
      }

      const result = changeWolfPosition(
        centerPosition,
        canvasWidth,
        canvasHeight
      )

      expect(result).toEqual({
        top: canvasHeight / 4,
        left: canvasWidth / 2.5,
      })
    })

    it('должен правильно позиционировать волка слева', () => {
      const leftPosition: TKeyDownResponseEx = {
        ...mockPosition,
        position: 'Left',
      }

      const result = changeWolfPosition(leftPosition, canvasWidth, canvasHeight)

      expect(result).toEqual({
        top: canvasHeight / 1.5,
        left: canvasWidth / 2.85,
      })
    })

    it('должен правильно позиционировать волка справа', () => {
      const rightPosition: TKeyDownResponseEx = {
        ...mockPosition,
        position: 'Right',
      }

      const result = changeWolfPosition(
        rightPosition,
        canvasWidth,
        canvasHeight
      )

      expect(result).toEqual({
        top: canvasHeight / 1.5,
        left: canvasWidth / 2,
      })
    })

    it('должен правильно позиционировать волка в верхнем левом углу', () => {
      const upperLeftPosition: TKeyDownResponseEx = {
        ...mockPosition,
        position: 'UpperLeft',
      }

      const result = changeWolfPosition(
        upperLeftPosition,
        canvasWidth,
        canvasHeight
      )

      expect(result).toEqual({
        top: canvasHeight / 2.5,
        left: canvasWidth / 2.98,
      })
    })

    it('должен правильно позиционировать волка в верхнем правом углу', () => {
      const upperRightPosition: TKeyDownResponseEx = {
        ...mockPosition,
        position: 'UpperRight',
      }

      const result = changeWolfPosition(
        upperRightPosition,
        canvasWidth,
        canvasHeight
      )

      expect(result).toEqual({
        top: canvasHeight / 2.5,
        left: canvasWidth / 2,
      })
    })
  })

  describe('разные размеры canvas', () => {
    it('должен работать с маленьким canvas', () => {
      const smallWidth = 400
      const smallHeight = 300

      const result = changeWolfPosition(mockPosition, smallWidth, smallHeight)

      expect(result).toEqual({
        top: smallHeight / 4,
        left: smallWidth / 2.5,
      })
    })

    it('должен работать с большим canvas', () => {
      const largeWidth = 1920
      const largeHeight = 1080

      const result = changeWolfPosition(mockPosition, largeWidth, largeHeight)

      expect(result).toEqual({
        top: largeHeight / 4,
        left: largeWidth / 2.5,
      })
    })
  })
})
