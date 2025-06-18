import React, { useEffect, useRef } from 'react'
import {
  createEgg,
  drawEgg,
  drawLine,
  linesAndEggs,
  updateEggs,
} from '../../utils/helpers/linesAndEggs'
import { EggInterface, LineInterface } from './GameInterfaces'

interface CanvasProps {
  width: number
  height: number
}

const GameTest = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null),
    animationRef = useRef<number>(),
    eggsRef = useRef<EggInterface[]>([]),
    linesRef = useRef<LineInterface[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Создаем линии
    linesRef.current = linesAndEggs(props.width, props.height)

    // lumus --*
    const animate = () => {
      ctx.clearRect(0, 0, props.width, props.height)

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
    }, 1000)

    // Очистка при размонтировании и стираем интервал на всякий
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        clearInterval(interval)
      }
    }
  }, [])

  return <canvas ref={canvasRef} width={props.width} height={props.height} />
}

export default GameTest
