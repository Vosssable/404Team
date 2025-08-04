import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer } from 'vite'
import { fileURLToPath } from 'url'
// ESM-compatible __dirname and __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = Number(process.env.SERVER_PORT || 3000)
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
async function createServer() {
  const app = express()
  let vite
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template
      let render
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = await fs.readFile(
          path.resolve(clientPath, 'dist/client/index.html'),
          'utf-8'
        )
        render = (
          await import(path.resolve(clientPath, 'dist/server/entry-server.js'))
        ).render
      }
      const { html: appHtml, state } = await render(url)
      const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        state
      ).replace(/</g, '\u003c')}</script>`
      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('</body>', `${stateScript}\n</body>`)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e)
      next(e)
    }
  })
  app.listen(port, () => {
    console.log(`SSR сервер запущен: http://localhost:${port}`)
  })
}
createServer()
