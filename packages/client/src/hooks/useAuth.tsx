import { useAppSelector } from '../store/storeHooks'

export const useAuth = () => {
  const user = useAppSelector(state => state.user)
  return !!user.login
}
