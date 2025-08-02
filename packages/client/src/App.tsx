import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './App.css'

const routers = createBrowserRouter(router)

function App() {
  return <RouterProvider router={routers} />
}

// для тестирования
window.helpers = {
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
}
export default App
