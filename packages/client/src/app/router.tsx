import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/ForumPage'
import NotFoundPage from '../pages/error-pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import AuthLayout from './AuthLayout'
import { GamePage } from '../pages/GamePage'
import GameStartPage from '../pages/GameStartPage'

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
    path: '/startgame',
    element: <GameStartPage />,
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
    element: <NotFoundPage />,
  },
])
