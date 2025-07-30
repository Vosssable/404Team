import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../store/storeHooks'
import { oauthCallbackThunk } from '../store/thunks/authThunk'

const OAuthCallbackPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code) {
      alert('Ошибка: код авторизации не получен')
      navigate('/login')
      return
    }

    const handleOAuthCallback = async () => {
      try {
        await dispatch(
          oauthCallbackThunk({ code, state: state || undefined })
        ).unwrap()
        navigate('/')
      } catch (error) {
        alert(
          error instanceof Error ? error.message : 'Ошибка OAuth авторизации'
        )
        navigate('/login')
      }
    }

    handleOAuthCallback()
  }, [searchParams, dispatch, navigate])

  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <div className="card w-25 p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <p className="mt-3">Выполняется авторизация через Яндекс...</p>
      </div>
    </div>
  )
}

export default OAuthCallbackPage
