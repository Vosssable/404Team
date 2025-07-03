import { type TEgg, type TLine, type TPosition } from '../GameInterfaces'
import React from 'react'
import store from '../../../store'
import { setProperties } from '../../../store/gameProperties'

const linesAndEggs = (width: number, height: number) => {
  return [
    {
      //левая верхняя
      start: { x: width / 5, y: height / 3 - 10 },
      end: { x: width / 3 - 5, y: height / 2 - 60 },
      index: 'UpperLeft' as TPosition,
    },
    {
      //левая нижняя
      start: { x: width / 5 + 20, y: (2 * height) / 3 - 80 },
      end: { x: (2 * width) / 5 - 80, y: (3 * height) / 4 - 50 },
      index: 'Left' as TPosition,
    },
    {
      //правая верхняя
      start: { x: (5 * width) / 6 - 50, y: height / 3 + 10 },
      end: { x: (2 * width) / 3 + 15, y: height / 2 - 40 },
      index: 'UpperRight' as TPosition,
    },
    {
      //правая нижняя
      start: { x: (5 * width) / 6 - 70, y: height / 2 + 75 },
      end: { x: (2 * width) / 3 - 25, y: (3 * height) / 4 - 30 },
      index: 'Right' as TPosition,
    },
  ]
}

const drawLine = (line: TLine, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'transparent'
  ctx.stroke()
}

const drawEgg = (egg: TEgg, ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.translate(egg.x, egg.y)
  ctx.rotate(egg.rotation)
  ctx.beginPath()
  ctx.ellipse(0, 0, 15, 20, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#ffc3c3'
  ctx.fill()

  ctx.restore()
}

// Создаем яичко
const createEgg = (
  eggsRef: React.MutableRefObject<TEgg[]>,
  linesRef: React.MutableRefObject<TLine[]>
) => {
  const lineIndex = Math.floor(Math.random() * linesRef.current.length),
    line = linesRef.current[lineIndex]

  eggsRef.current.push({
    line: lineIndex,
    progress: 0,
    stage: 0,
    rotation: 0,
    x: line.start.x,
    y: line.start.y,
    lastUpdate: Date.now(),
  })
}

const updateEggs = (
  eggsRef: React.MutableRefObject<TEgg[]>,
  linesRef: React.MutableRefObject<TLine[]>
) => {
  const now = Date.now(),
    eggs = eggsRef.current,
    lines = linesRef.current

  for (let i = eggs.length - 1; i >= 0; i--) {
    const egg = eggs[i],
      line = lines[egg.line],
      timePassed = (now - egg.lastUpdate) / 1000
    if (timePassed >= 2) {
      egg.stage++
      egg.lastUpdate = now

      switch (egg.stage) {
        case 1:
          egg.progress = 0.25
          egg.rotation = Math.PI / 2
          break
        case 2:
          egg.progress = 0.5
          egg.rotation = Math.PI
          break
        case 3:
          egg.progress = 0.8
          egg.rotation = Math.PI * 1.5
          break
        case 4:
          egg.progress = 1
          egg.rotation = Math.PI * 2
          break
        case 5:
          egg.progress = 1
          egg.y += 20
          break
        case 6:
          eggs.splice(i, 1)
          updateProperties(line.index)
          break
      }
    }

    if (egg.stage < 5) {
      egg.x = line.start.x + (line.end.x - line.start.x) * egg.progress
      egg.y = line.start.y + (line.end.y - line.start.y) * egg.progress
    } else {
      if (line.index.includes('Right')) {
        egg.x = line.start.x + (line.end.x - line.start.x) * egg.progress - 15
      } else {
        egg.x = line.start.x + (line.end.x - line.start.x) * egg.progress + 30
      }
      egg.y = line.start.y + (line.end.y - line.start.y) * egg.progress + 40
    }
  }
}

function updateProperties(eggPosition: string) {
  const storeState = store.getState(),
    life = storeState.gameProperties.life,
    score = storeState.gameProperties.score,
    currentWolfPosition = storeState.wolfPosition.position

  if (currentWolfPosition == eggPosition) {
    store.dispatch(
      setProperties({
        life: life,
        score: score + 10,
      })
    )
  } else if (currentWolfPosition !== eggPosition) {
    store.dispatch(
      setProperties({
        life: life - 1,
        score: score,
      })
    )
  }
}

export { drawLine, updateEggs, createEgg, linesAndEggs, drawEgg }
