import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  // TODO: В будущем здесь будет реальная проверка авторизации
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
