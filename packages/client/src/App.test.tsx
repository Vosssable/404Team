import App from './App'
import { render, screen } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('App renders home page', async () => {
  render(<App />)
  expect(screen.getByText('Главная страница')).toBeDefined()
})
