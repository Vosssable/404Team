import { HOST_URL } from '../hooks/route'
import { httpRequest } from './http'

const BASE_URL = `${HOST_URL}/leaderboard`
const RATING_FIELD = 'score'
const TEAM_NAME = '404Team'

type LeaderboardData = {
  user: string
  [RATING_FIELD]: number
  time?: string
}

export const sendResultToLeaderboard = async (data: LeaderboardData) => {
  return httpRequest(`${BASE_URL}`, {
    method: 'POST',
    body: {
      ratingFieldName: RATING_FIELD,
      teamName: TEAM_NAME,
      data,
    },
  })
}

export const getLeaderboard = async (limit = 10, cursor = 0) => {
  return httpRequest(`${BASE_URL}/${TEAM_NAME}`, {
    method: 'POST',
    body: {
      ratingFieldName: RATING_FIELD,
      cursor,
      limit,
    },
  })
}
