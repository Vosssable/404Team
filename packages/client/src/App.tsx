import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './App.css'
import { useEffect } from 'react'

const routers = createBrowserRouter(router)

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:3000`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <RouterProvider router={routers} />
}

export default App
