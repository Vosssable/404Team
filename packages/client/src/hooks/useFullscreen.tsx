import { useCallback } from 'react'

export const useFullscreen = () => {
  const enterFullscreen = useCallback(() => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if ((el as any).webkitRequestFullscreen) {
      ;(el as any).webkitRequestFullscreen()
    } else if ((el as any).mozRequestFullScreen) {
      ;(el as any).mozRequestFullScreen()
    } else if ((el as any).msRequestFullscreen) {
      ;(el as any).msRequestFullscreen()
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      ;(document as any).webkitExitFullscreen()
    } else if ((document as any).mozCancelFullScreen) {
      ;(document as any).mozCancelFullScreen()
    } else if ((document as any).msExitFullscreen) {
      ;(document as any).msExitFullscreen()
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }, [enterFullscreen, exitFullscreen])

  return { enterFullscreen, exitFullscreen, toggleFullscreen }
}
