import {
  linesAndEggs,
  createEgg,
  updateEggs,
  drawLine,
  drawEgg,
} from '../linesAndEggs'
import type { TLine, TEgg } from '../../GameInterfaces'
import type { Store } from '@reduxjs/toolkit'

// Мокаем store
const mockStore = {
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    gameProperties: { score: 0, life: 3 },
    wolfPosition: { position: 'Center' },
  })),
} as unknown as Store

describe('linesAndEggs', () => {
  describe('создание линий', () => {
    it('должен создавать правильные линии для заданных размеров', () => {
      const width = 800
      const height = 600
      const lines = linesAndEggs(width, height)

      expect(lines).toHaveLength(4)
      expect(lines[0].index).toBe('UpperLeft')
      expect(lines[1].index).toBe('Left')
      expect(lines[2].index).toBe('UpperRight')
      expect(lines[3].index).toBe('Right')
    })

    it('должен создавать линии с правильными координатами', () => {
      const width = 800
      const height = 600
      const lines = linesAndEggs(width, height)

      // Проверяем первую линию (UpperLeft)
      expect(lines[0].start.x).toBe(width / 5)
      expect(lines[0].start.y).toBe(height / 3 - 10)
      expect(lines[0].end.x).toBe(width / 3 - 5)
      expect(lines[0].end.y).toBe(height / 2 - 60)

      // Проверяем вторую линию (Left)
      expect(lines[1].start.x).toBe(width / 5 + 20)
      expect(lines[1].start.y).toBe((2 * height) / 3 - 80)
    })

    it('должен работать с разными размерами canvas', () => {
      const width = 1920
      const height = 1080
      const lines = linesAndEggs(width, height)

      expect(lines).toHaveLength(4)
      expect(lines[0].start.x).toBe(width / 5)
      expect(lines[0].start.y).toBe(height / 3 - 10)
    })
  })

  describe('createEgg', () => {
    it('должен создавать яйцо с правильными начальными свойствами', () => {
      const eggsRef = { current: [] as TEgg[] }
      const linesRef = { current: linesAndEggs(800, 600) }

      createEgg(eggsRef, linesRef)

      expect(eggsRef.current).toHaveLength(1)
      const egg = eggsRef.current[0]
      expect(egg.progress).toBe(0)
      expect(egg.stage).toBe(0)
      expect(egg.rotation).toBe(0)
      expect(egg.line).toBeGreaterThanOrEqual(0)
      expect(egg.line).toBeLessThan(linesRef.current.length)
      expect(egg.x).toBe(linesRef.current[egg.line].start.x)
      expect(egg.y).toBe(linesRef.current[egg.line].start.y)
      expect(egg.lastUpdate).toBeDefined()
    })

    it('должен добавлять яйцо в массив', () => {
      const eggsRef = { current: [] as TEgg[] }
      const linesRef = { current: linesAndEggs(800, 600) }

      createEgg(eggsRef, linesRef)
      expect(eggsRef.current).toHaveLength(1)

      createEgg(eggsRef, linesRef)
      expect(eggsRef.current).toHaveLength(2)
    })
  })

  describe('updateEggs', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('должен обновлять яйца через 2 секунды', () => {
      const eggsRef = { current: [] as TEgg[] }
      const linesRef = { current: linesAndEggs(800, 600) }

      // Создаем яйцо
      createEgg(eggsRef, linesRef)
      const egg = eggsRef.current[0]
      const originalLastUpdate = egg.lastUpdate

      // Симулируем прошествие 2 секунд
      const mockNow = originalLastUpdate + 2000
      jest.spyOn(Date, 'now').mockReturnValue(mockNow)

      updateEggs(eggsRef, linesRef, mockStore)

      expect(egg.stage).toBe(1)
      expect(egg.progress).toBe(0.25)
      expect(egg.rotation).toBe(Math.PI / 2)
      expect(egg.lastUpdate).toBe(mockNow)
    })

    it('должен удалять яйцо на 6-й стадии', () => {
      const eggsRef = { current: [] as TEgg[] }
      const linesRef = { current: linesAndEggs(800, 600) }

      createEgg(eggsRef, linesRef)
      const egg = eggsRef.current[0]
      egg.stage = 5
      egg.progress = 1

      const mockNow = egg.lastUpdate + 2000
      jest.spyOn(Date, 'now').mockReturnValue(mockNow)

      updateEggs(eggsRef, linesRef, mockStore)

      expect(eggsRef.current).toHaveLength(0)
      expect(mockStore.dispatch).toHaveBeenCalled()
    })

    it('должен обновлять позицию яйца на основе прогресса', () => {
      const eggsRef = { current: [] as TEgg[] }
      const linesRef = { current: linesAndEggs(800, 600) }

      createEgg(eggsRef, linesRef)
      const egg = eggsRef.current[0]
      const line = linesRef.current[egg.line]

      // Устанавливаем прогресс
      egg.progress = 0.5
      egg.stage = 2

      updateEggs(eggsRef, linesRef, mockStore)

      const expectedX = line.start.x + (line.end.x - line.start.x) * 0.5
      const expectedY = line.start.y + (line.end.y - line.start.y) * 0.5

      expect(egg.x).toBe(expectedX)
      expect(egg.y).toBe(expectedY)
    })
  })

  describe('drawLine', () => {
    it('должен вызывать методы canvas для отрисовки линии', () => {
      const mockCtx = {
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        lineWidth: 0,
        strokeStyle: '',
        stroke: jest.fn(),
      } as unknown as CanvasRenderingContext2D

      const line: TLine = {
        start: { x: 100, y: 100 },
        end: { x: 200, y: 200 },
        index: 'Center',
      }

      drawLine(line, mockCtx)

      expect(mockCtx.beginPath).toHaveBeenCalled()
      expect(mockCtx.moveTo).toHaveBeenCalledWith(100, 100)
      expect(mockCtx.lineTo).toHaveBeenCalledWith(200, 200)
      expect(mockCtx.lineWidth).toBe(2)
      expect(mockCtx.strokeStyle).toBe('transparent')
      expect(mockCtx.stroke).toHaveBeenCalled()
    })
  })

  describe('drawEgg', () => {
    it('должен вызывать методы canvas для отрисовки яйца', () => {
      const mockCtx = {
        save: jest.fn(),
        translate: jest.fn(),
        rotate: jest.fn(),
        beginPath: jest.fn(),
        ellipse: jest.fn(),
        fillStyle: '',
        fill: jest.fn(),
        restore: jest.fn(),
      } as unknown as CanvasRenderingContext2D

      const egg: TEgg = {
        line: 0,
        progress: 0.5,
        stage: 2,
        rotation: Math.PI,
        x: 150,
        y: 150,
        lastUpdate: Date.now(),
      }

      drawEgg(egg, mockCtx)

      expect(mockCtx.save).toHaveBeenCalled()
      expect(mockCtx.translate).toHaveBeenCalledWith(150, 150)
      expect(mockCtx.rotate).toHaveBeenCalledWith(Math.PI)
      expect(mockCtx.beginPath).toHaveBeenCalled()
      expect(mockCtx.ellipse).toHaveBeenCalledWith(
        0,
        0,
        15,
        20,
        0,
        0,
        Math.PI * 2
      )
      expect(mockCtx.fillStyle).toBe('#ffc3c3')
      expect(mockCtx.fill).toHaveBeenCalled()
      expect(mockCtx.restore).toHaveBeenCalled()
    })
  })
})
