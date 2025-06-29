import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/storeHooks'
import { ReactNode } from 'react'

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector(state => state.user)

  if (!user.login) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
