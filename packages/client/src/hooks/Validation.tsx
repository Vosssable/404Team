export class Validation {
  private static patterns: Record<string, RegExp> = {
    first_name: /^[A-Za-zА-Яа-яёЁ-]{2,20}$/, //Латиница и кириллица + ёЁ + от 2 до 20 символов
    second_name: /^[A-Za-zА-Яа-яёЁ-]{2,20}$/, //Латиница и кириллица + ёЁ + от 2 до 20 символов
    login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/, //Латиница + цифры(обязательно буквы) + нижнее подчеркивание и дефис+ от 3 до 20 символов
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password:
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=|\\{}[\]:;"',.<>/?~]).{8,15}$/, // обязательно хотя бы 1 цифа, заглавная буква, спецсимвол
    phone: /^\+?\d{10,15}$/,
    message: /.+/,
  }

  private static errorMessages: Record<string, string> = {
    first_name: 'Только буквы и дефис',
    second_name: 'Только буквы и дефис',
    login:
      'От 3 до 20 символов, латинские буквы, цифры, дефис или подчеркивание',
    email: 'Некорректный email',
    password: '8-15 символов и цифр,так же заглавная и спец',
    phone: 'От 10 до 15 цифр, можно +',
    message: 'Не должно быть пустым',
  }

  public static setError(
    field: HTMLInputElement,
    message: string | null
  ): void {
    const errorElement = field.nextElementSibling as HTMLElement | null

    if (message) {
      field.classList.add('input-error')
      if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = 'block'
      }
    } else {
      field.classList.remove('input-error')
      if (errorElement) {
        errorElement.textContent = ''
        errorElement.style.display = 'none'
      }
    }
  }

  public static validate(field: HTMLInputElement): boolean {
    const { name, value } = field
    const pattern = this.patterns[name]
    if (!pattern) return true

    const isValid = pattern.test(value.trim())

    this.setError(field, isValid ? null : this.errorMessages[name])
    return isValid
  }
}
