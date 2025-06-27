import { Validation } from './Validation'

export function validationHook(form: HTMLFormElement): boolean {
  let isValid = true

  form.querySelectorAll('input').forEach(el => {
    const input = el as HTMLInputElement

    if (input.name === 'retryPassword') {
      const pwdInput = form.querySelector(
        "input[name='password']"
      ) as HTMLInputElement
      const pwd = pwdInput ? pwdInput.value : ''

      if (input.value !== pwd) {
        isValid = false
        Validation.setError(input, 'Пароли не совпадают')
        return
      } else {
        Validation.setError(input, null)
      }
    }

    if (!Validation.validate(input)) {
      isValid = false
    }
  })

  return isValid
}
