import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import type { ColDef } from 'ag-grid-community'
import './LeaderBoard.css'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([ClientSideRowModelModule])

const Leader = () => {
  const [rowData] = useState([
    { id: 1, name: 'Игрок 1', score: 1500, time: '02:30' },
    { id: 2, name: 'Игрок 2', score: 1200, time: '03:10' },
    { id: 3, name: 'Игрок 3', score: 980, time: '04:05' },
    { id: 4, name: 'Игрок 4', score: 850, time: '04:45' },
    { id: 5, name: 'Игрок 5', score: 720, time: '05:20' },
  ])

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

        <div className="update-note">
          Обновлено: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default Leader
