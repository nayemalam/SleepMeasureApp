export const API_BASE_URL = 'https://s3.amazonaws.com/eight-public';

export const CHALLENGE_API_ROUTE = (challengeId: string) =>
  `${API_BASE_URL}/challenge/${challengeId}.json`;
