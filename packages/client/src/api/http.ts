const defaultHeaders = {
  'Content-Type': 'application/json',
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: HeadersInit
  credentials?: RequestCredentials
}

export const httpRequest = async <T>(
  url: string,
  {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include',
  }: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error ${response.status}: ${errorText}`)
  }

  return response.json()
}
