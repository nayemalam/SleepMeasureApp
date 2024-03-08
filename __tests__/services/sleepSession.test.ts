import { getProfileData } from '../../src/services/SleepSessionService';
import { CHALLENGE_API_ROUTE } from '../../src/services/api';

describe('getProfileData', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('throws an error if no challengeId is provided', async () => {
    await expect(getProfileData('')).rejects.toThrow('No challengeId provided');
  });

  it('fetches data successfully with a valid challengeId', async () => {
    const mockSleepData = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [],
        timeseries: {},
        score: 90,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockSleepData));

    const result = await getProfileData('validChallengeId');

    expect(result).toEqual(mockSleepData);
    expect(fetch).toHaveBeenCalledWith(CHALLENGE_API_ROUTE('validChallengeId'));
  });

  it('handles fetch errors', async () => {
    const errorMessage = 'Failed to fetch';
    fetchMock.mockRejectOnce(new Error(errorMessage));

    await expect(getProfileData('validChallengeId')).rejects.toThrow(
      errorMessage,
    );
  });
});
