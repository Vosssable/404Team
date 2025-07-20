'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const express_1 = __importDefault(require('express'))
const path_1 = __importDefault(require('path'))
const promises_1 = __importDefault(require('fs/promises'))
const vite_1 = require('vite')
const port = Number(process.env.PORT || 3000)
const clientPath = path_1.default.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
async function createServer() {
  const app = (0, express_1.default)()
  let vite
  if (isDev) {
    vite = await (0, vite_1.createServer)({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express_1.default.static(path_1.default.join(clientPath, 'dist/client'), {
        index: false,
      })
    )
  }
  app.get('*', async (req, res, next) => {
    var _a
    const url = req.originalUrl
    try {
      let template
      let render
      if (vite) {
        template = await promises_1.default.readFile(
          path_1.default.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = await promises_1.default.readFile(
          path_1.default.resolve(clientPath, 'dist/client/index.html'),
          'utf-8'
        )
        render = (
          await ((_a = path_1.default.resolve(
            clientPath,
            'dist/server/entry-server.js'
          )),
          Promise.resolve().then(() => __importStar(require(_a))))
        ).render
      }
      const appHtml = await render(url)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
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
