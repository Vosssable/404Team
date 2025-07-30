import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './App.css'

const routers = createBrowserRouter(router)

function App() {
  return <RouterProvider router={routers} />
}

export default App
