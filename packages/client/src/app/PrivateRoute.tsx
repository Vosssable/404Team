import { useAppSelector } from '../store/storeHooks'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(state => state.user)
  if (!user.isAuthChecked) {
    return <div>Загрузка...</div>
  }
  return user.id ? children : <Navigate to="/login" />
}

export default PrivateRoute
