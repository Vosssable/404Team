import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/ForumPage'
import ErrorPage from '../pages/ErrorPage'
import PrivateRoute from './PrivateRoute'
import AuthLayout from './AuthLayout'
import { GamePage } from '../pages/GamePage'
import Lider from '../pages/LiderBord'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: 'liders',
    element: <Lider />,
  },
])
