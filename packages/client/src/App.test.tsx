import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from './store'

const store = createStore()
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 1,
        first_name: 'Aleksei',
        second_name: 'Test',
        login: 'testLogin',
        email: 'test123@testing.com',
        phone: '+71234567890',
        avatar: null,
        display_name: null,
      }),
  })
)

// @ts-ignore
global.Request = jest.fn().mockImplementation(() => ({
  headers: new Headers(),
}))

test('App renders home page', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const el = await screen.findByText('Главная страница')
  expect(el).toBeTruthy()
})
