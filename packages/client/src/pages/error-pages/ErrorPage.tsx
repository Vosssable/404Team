import { useCallback } from 'react'
import styles from './ErrorPage.module.css'

const ErrorPage = () => {
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className={`${styles.errorPage} ${styles.error500}`}>
      <header className={styles.header}>
        <button className={styles.link} onClick={handleReload}>
          Перезагрузить страницу
        </button>
      </header>
      <div className={styles.spacer} />
    </div>
  )
}

export default ErrorPage
