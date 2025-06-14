import { Link, useNavigate } from 'react-router-dom'
import './ErrorPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="errorPage error404">
      <header className="header">
        <Link to="/" className="link">
          На главную
        </Link>
        <button className="link" onClick={() => navigate(-1)}>
          Назад
        </button>
      </header>
      <div className="spacer" />
    </div>
  )
}

export default NotFoundPage
