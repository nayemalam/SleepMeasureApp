import { CHALLENGE_API_ROUTE } from './api';
export async function getProfileData(challengeId: string) {
  if (!challengeId) throw new Error('No challengeId provided');
  try {
    const response = await fetch(`${CHALLENGE_API_ROUTE(challengeId)}`);
    const result = await response.json();
    return result;
  } catch (err) {
    // handle error
    console.log('Error in SleepSessionService: ', err);
    throw err;
  }
}

export async function getAllFamilyData(challengeIds: string[]) {
  try {
    const promises = challengeIds.map(async challengeId => {
      const response = await fetch(`${CHALLENGE_API_ROUTE(challengeId)}`);
      console.log('RESPONSE: ', response);
      const result = await response.json();
      return result.intervals;
    });
    const results = await Promise.all(promises);

    const combinedIntervals = results.flat();
    return combinedIntervals;
  } catch (err) {
    console.log('Error in getAllFamilyData: ', err);
    throw err;
  }
}

export default {
  getProfileData,
  getAllFamilyData,
};
