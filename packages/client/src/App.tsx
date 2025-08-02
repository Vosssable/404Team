import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './App.css'

const routers = createBrowserRouter(router)

function App() {
  return <RouterProvider router={routers} />
}

// для тестирования
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window['helpers'] = {
  getEmoji: async () => {
    const test = await fetch('http://localhost:3001/emojis', { method: 'GET' })
    test.json().then(json => {
      console.log(json)
    })
  },
  getEmoj: async (id: number) => {
    const test = await fetch(`http://localhost:3001/emojis/${id}`, {
      method: 'GET',
    })
    test.json().then(json => {
      console.log(json)
    })
  },
  getUser: async (username: string) => {
    const test = await fetch(`http://localhost:3001/user/${username}`, {
      method: 'GET',
    })
    test.json().then(json => {
      console.log(json)
    })
  },
  postUser: async (username: string, darkTheme: boolean) => {
    const test = await fetch(`http://localhost:3001/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        darkTheme: darkTheme,
      }),
    })
    test.json().then(json => {
      console.log(json)
    })
  },
  patchUser: async (username: string) => {
    const test = await fetch(`http://localhost:3001/user/${username}`, {
      method: 'PATCH',
    })
    test.json().then(json => {
      console.log(json)
    })
  },
}
export default App
