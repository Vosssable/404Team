import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../store/storeHooks'
import { getUserThunk } from '../store/thunks/authThunk'

const AuthLayout = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getUserThunk()).finally(() => setLoading(false))
  }, [dispatch])

  if (loading) return <div>Загрузка...</div>

  return <Outlet />
}

export default AuthLayout
