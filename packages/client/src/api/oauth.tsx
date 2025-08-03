import { HOST_URL } from '../hooks/route'

/**
 * Инициирует процесс OAuth авторизации через Яндекс
 * Отправляет запрос на сервер для получения service_id, необходимого для начала OAuth процесса
 *
 * @param redirectUri - URI для перенаправления после авторизации
 */
export async function initiateOAuth(redirectUri: string): Promise<string> {
  const response = await fetch(
    `${HOST_URL}/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`,
    {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Ошибка: ${response.status}`)
  }

  const data = await response.json()
  return data.service_id
}

/**
 * Завершает процесс OAuth авторизации через Яндекс
 * Отправляет полученный код авторизации на сервер для обмена на токен доступа
 * После успешного выполнения пользователь считается авторизованным
 *
 * @param code - код авторизации, полученный от Яндекс OAuth сервиса
 * @param redirectUri - URI для перенаправления, должен совпадать с тем, что использовался при инициации
 */
export async function completeOAuth(
  code: string,
  redirectUri: string
): Promise<void> {
  const response = await fetch(`${HOST_URL}/oauth/yandex`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Ошибка: ${response.status}`)
  }
}
