import { useAppDispatch } from '../../store/storeHooks'
import { oauthYandexThunk } from '../../store/thunks/authThunk'
import './OAuthButton.css'

export const OAuthButton = () => {
  const dispatch = useAppDispatch()

  const handleOAuthClick = async () => {
    try {
      await dispatch(oauthYandexThunk()).unwrap()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка OAuth авторизации')
    }
  }

  return (
    <button type="button" className="oauth-button" onClick={handleOAuthClick}>
      <img
        className="oauth-button__icon"
        src="/images/ybutton-logo.webp"
        alt="Яндекс"
      />
      Войти через Яндекс
    </button>
  )
}
