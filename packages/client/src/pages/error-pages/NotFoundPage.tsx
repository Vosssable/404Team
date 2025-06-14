import { Link, useNavigate } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className={`${styles.errorPage} ${styles.error404}`}>
      <header className={styles.header}>
        <Link to="/" className={styles.link}>
          На главную
        </Link>
        <button className={styles.link} onClick={() => navigate(-1)}>
          Назад
        </button>
      </header>
      <div className={styles.spacer} />
    </div>
  )
}

export default NotFoundPage
