export type FormInput = {
  type: string
  id: string
  label: string
  name: string
}

export type FormConfig = {
  description: string
  inputs: FormInput[]
  buttonText: string
  href: string
  linkText: string
}
