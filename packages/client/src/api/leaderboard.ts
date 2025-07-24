import { HOST_URL } from '../hooks/route'

const BASE_URL = `${HOST_URL}/leaderboard`
const RATING_FIELD = 'score'
const TEAM_NAME = '404Team'

type LeaderboardData = {
  user: string
  [RATING_FIELD]: number
  time?: string
}

export const sendResultToLeaderboard = async (data: LeaderboardData) => {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ratingFieldName: RATING_FIELD,
      teamName: TEAM_NAME,
      data,
    }),
  })
}

export const getLeaderboard = async (limit = 10, cursor = 0) => {
  const res = await fetch(`${BASE_URL}/${TEAM_NAME}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ratingFieldName: RATING_FIELD,
      cursor,
      limit,
    }),
  })

  return res.json()
}
