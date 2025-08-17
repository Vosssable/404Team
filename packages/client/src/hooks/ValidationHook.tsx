import { Validation } from './Validation'
import { validateInput } from '../utils/xssProtection'

export function validationHook(form: HTMLFormElement): boolean {
  let isValid = true

  form.querySelectorAll<HTMLInputElement>('input').forEach(field => {
    if (field.name === 'retryPassword') {
      const pwd =
        form.querySelector<HTMLInputElement>("input[name='password']")?.value ??
        ''
      if (field.value !== pwd) {
        isValid = false
        Validation.setError(field, 'Пароли не совпадают')
        return
      } else {
        Validation.setError(field, null)
      }
    }

    // Применяем защиту от XSS перед валидацией
    const sanitizedValue = validateInput(field.value, 1000)
    if (sanitizedValue === null) {
      isValid = false
      Validation.setError(field, 'Обнаружен небезопасный ввод')
      return
    }

    if (!Validation.validate(field)) {
      isValid = false
    }
  })

  return isValid
}
