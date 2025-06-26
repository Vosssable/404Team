export type TKeyDownResponse =
  | {
      position: TPosition
      className: string
      imageUrl: string
    }
  | 'PAUSE'

export type TKeyDownResponseEx = Exclude<TKeyDownResponse, 'PAUSE'>

export type TPosition = 'Center' | 'Right' | 'Left' | 'UpperRight' | 'UpperLeft'

export type TGameStatus = 'OFF' | 'ON' | 'PAUSE' | 'END'

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
