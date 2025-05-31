import { useLocation, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const location = useLocation()
  const pageTitle =
    location.pathname === '/login' ? 'Страница входа' : 'Страница регистрации'

  return (
    <>
      <h2>{pageTitle}</h2>
      <Outlet />
    </>
  )
}

export default AuthLayout
