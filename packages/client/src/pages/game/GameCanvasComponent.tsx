import React, { useEffect, useRef } from 'react'
import {
  createEgg,
  drawEgg,
  drawLine,
  linesAndEggs,
  updateEggs,
} from './helpers/linesAndEggs'
import { type TEgg, type TLine } from './GameInterfaces'

type TProps = {
  width: number
  height: number
  isPaused?: boolean
}

const GameCanvasComponent = ({ width, height, isPaused }: TProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const eggsRef = useRef<TEgg[]>([])
  const linesRef = useRef<TLine[]>([])

  useEffect(() => {
    if (isPaused) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Создаем линии
    linesRef.current = linesAndEggs(width, height)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      linesRef.current.forEach(line => drawLine(line, ctx))
      updateEggs(eggsRef, linesRef)
      eggsRef.current.forEach(egg => drawEgg(egg, ctx))

      animationRef.current = requestAnimationFrame(animate)
    }

    // Старт игры, пока для наглядности интервал 1000,
    // затем сделаем увеличение по какому-нибудь принципу
    animate()
    const interval = setInterval(() => {
      createEgg(eggsRef, linesRef)
    }, 2000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        clearInterval(interval)
      }
    }
  }, [height, isPaused])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default GameCanvasComponent
