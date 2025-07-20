import { renderToString } from 'react-dom/server'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './app/router.server'
import { Provider } from 'react-redux'
import { store } from './store'

export async function render(url: string) {
  const router = await createRouter(url)

  const html = renderToString(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )

  return html
}
