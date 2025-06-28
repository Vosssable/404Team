export type TKeyDownResponse = {
  position: TPosition
  className: string
  imageUrl: string
}

export type TPosition = 'Center' | 'Right' | 'Left' | 'UpperRight' | 'UpperLeft'

export type TLine = {
  start: { x: number; y: number }
  end: { x: number; y: number }
  index: TPosition
}

export type TEgg = {
  line: number
  progress: number
  stage: number
  rotation: number
  x: number
  y: number
  lastUpdate: number
}
