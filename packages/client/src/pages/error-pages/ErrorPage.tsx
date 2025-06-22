import { useCallback } from 'react'
import cn from 'classnames'
import './ErrorPage.css'

const ErrorPage = () => {
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className={cn('errorPage', 'error500')}>
      <header className="header">
        <button className="link" onClick={handleReload}>
          Перезагрузить страницу
        </button>
      </header>
    </div>
  )
}

export default ErrorPage
