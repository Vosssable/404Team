import { HOST_URL } from '../hooks/route'

export async function registration(args: {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}) {
  try {
    const response = await fetch(`${HOST_URL}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || `Ошибка: ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    return Promise.reject(err)
  }
}
