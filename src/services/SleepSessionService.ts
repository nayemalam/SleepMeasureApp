import { CHALLENGE_API_ROUTE } from './api';
export async function getProfileData(challengeId: string) {
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
      return result.intervals; // Return just the intervals part of each result
    });
    const results = await Promise.all(promises);
    // Flatten the array of intervals arrays into a single array of intervals
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
