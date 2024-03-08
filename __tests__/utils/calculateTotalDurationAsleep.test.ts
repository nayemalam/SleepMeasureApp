import { SleepInterval } from '../../src/types';
import { calculateTotalDurationAsleep } from '../../src/utils';

describe('calculateTotalDurationAsleep', () => {
  it('calculates the total duration of sleep excluding awake and out stages', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [
          { stage: 'awake', duration: 200 },
          { stage: 'light', duration: 300 },
        ],
        timeseries: {
          heartRate: [],
          respiratoryRate: [],
          tempBedC: [],
          tempRoomC: [],
          tnt: [],
        },
        score: 90,
      },
      {
        id: '2',
        ts: '2021-01-01T05:00:00Z',
        stages: [
          { stage: 'deep', duration: 400 },
          { stage: 'out', duration: 100 },
        ],
        timeseries: {
          heartRate: [],
          respiratoryRate: [],
          tempBedC: [],
          tempRoomC: [],
          tnt: [],
        },
        score: 80,
      },
    ];

    const result = calculateTotalDurationAsleep(sleepIntervals);
    expect(result).toBe(700); // 300 (light) + 400 (deep) = 700
  });

  it('returns 0 for no sleep intervals', () => {
    const result = calculateTotalDurationAsleep([]);
    expect(result).toBe(0);
  });
});
