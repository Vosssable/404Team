import { useMemo, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import type { ColDef } from 'ag-grid-community'
import './LeaderBoard.css'
import { getLeaderboard } from '../api/leaderboard'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([ClientSideRowModelModule])

type LeaderboardEntry = {
  data: {
    user: string
    score: number
    time?: string
  }
}

const Leader = () => {
  const [rowData, setRowData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeaderboard(10, 0)
        const entries: LeaderboardEntry[] = response || []

        const formatted = entries.map(entry => {
          const seconds = Number(entry.data.time)
          const minutes = Math.floor(seconds / 60)
          const remainingSeconds = Math.floor(seconds % 60)
          const formattedTime = `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`

          return {
            name: entry.data.user,
            score: entry.data.score,
            time: isNaN(seconds) ? '—' : formattedTime,
          }
        })

        setRowData(formatted)
      } catch (err) {
        console.error('Ошибка при получении лидерборда:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: 'РАНГ',
        valueGetter: params =>
          params.node?.rowIndex ? params.node.rowIndex + 1 : 1,
        flex: 1,
        cellStyle: { textAlign: 'center', fontWeight: 'bold' },
      },
      {
        headerName: 'ИГРОК',
        field: 'name',
        sortable: true,
        filter: true,
        flex: 2,
      },
      {
        headerName: 'ОЧКИ',
        field: 'score',
        sortable: true,
        filter: true,
        flex: 1,
      },
      {
        headerName: 'ВРЕМЯ',
        field: 'time',
        sortable: true,
        filter: true,
        flex: 1,
      },
    ],
    []
  )

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      suppressSizeToFit: false,
    }),
    []
  )

  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <div className="lider-container ag-theme-alpine-dark">
        {/* Декоративные элементы */}
        <div className="top-glow" />
        <div className="center-line" />

        <h1 className="title">ТАБЛИЦА ЛИДЕРОВ</h1>

        {loading ? (
          <p className="text-white text-center">Загрузка...</p>
        ) : (
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            domLayout="autoHeight"
            rowClass="row-class"
            rowHeight={60}
            headerHeight={50}
            suppressHorizontalScroll={true}
            onGridReady={params => {
              params.api.sizeColumnsToFit()
            }}
          />
        )}

        <div className="update-note">
          Обновлено: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default Leader
