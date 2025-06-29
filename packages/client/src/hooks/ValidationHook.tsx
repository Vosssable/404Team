import { Validation } from './Validation'

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

    if (!Validation.validate(field)) {
      isValid = false
    }
  })

  return isValid
}
