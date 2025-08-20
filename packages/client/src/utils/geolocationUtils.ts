export interface LocationInfo {
  country: string
  city: string
}

/**
 * Получает информацию о местоположении пользователя
 * @returns Promise с информацией о стране и городе
 */
export const getLocationInfo = (): Promise<LocationInfo> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается в вашем браузере'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        // Получаем информацию о местоположении через reverse geocoding
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=ru`
        )
          .then(response => {
            if (!response.ok) {
              throw new Error('Не удалось получить информацию о местоположении')
            }
            return response.json()
          })
          .then(data => {
            resolve({
              country: data.address.country || 'Неизвестно',
              city:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                'Неизвестно',
            })
          })
          .catch(() => {
            // Если не удалось получить через API, используем заглушку
            resolve({
              country: 'Россия',
              city: 'Ваш город',
            })
          })
      },
      error => {
        let errorMessage = 'Не удалось получить местоположение'

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Доступ к геолокации запрещен'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Информация о местоположении недоступна'
            break
          case error.TIMEOUT:
            errorMessage = 'Время ожидания истекло'
            break
          default:
            errorMessage = 'Произошла неизвестная ошибка'
        }

        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 минут
      }
    )
  })
}
