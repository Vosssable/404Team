import { useAppSelector } from '../store/storeHooks'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(state => state.user)
  if (!user.isAuthChecked) {
    return <div>Загрузка...</div>
  }
  return user.id ? <Navigate to="/" /> : children
}

export default PublicRoute
