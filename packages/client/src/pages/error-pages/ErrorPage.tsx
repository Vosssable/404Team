import { useCallback } from 'react'
import './ErrorPage.css'

const ErrorPage = () => {
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="errorPage error500">
      <header className="header">
        <button className="link" onClick={handleReload}>
          Перезагрузить страницу
        </button>
      </header>
      <div className="spacer" />
    </div>
  )
}

export default ErrorPage
