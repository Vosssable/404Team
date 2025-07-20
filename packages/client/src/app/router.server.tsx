import {
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server'
import { router } from './router'

export async function createRouter(url: string) {
  const handler = createStaticHandler(router)

  const context = await handler.query(new Request(`http://localhost${url}`))

  if (context instanceof Response) {
    throw new Error('SSR error')
  }

  return createStaticRouter(router, context)
}
