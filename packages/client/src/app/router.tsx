import type { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/forum/ForumPage'
import NotFoundPage from '../pages/error-pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AuthLayout from './AuthLayout'
import GamePage from '../pages/GamePage'
import ForumTopicPage from '../pages/forum/ForumTopicPage'
import ForumCreateTopicPage from '../pages/forum/ForumCreateTopicPage'
import Leader from '../pages/LeaderBoard'
import OAuthCallbackPage from '../pages/OAuthCallbackPage'

export const router: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/game',
        element: (
          <PrivateRoute>
            <GamePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: '/oauth-callback',
        element: <OAuthCallbackPage />,
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
        element: (
          <PrivateRoute>
            <ForumPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/forum/create',
        element: (
          <PrivateRoute>
            <ForumCreateTopicPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/forum/:topicId',
        element: (
          <PrivateRoute>
            <ForumTopicPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/leaders',
        element: (
          <PrivateRoute>
            <Leader />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]
