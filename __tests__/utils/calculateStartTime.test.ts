import { SleepInterval } from '../../src/types';
import { calculateStartTime } from '../../src/utils';

describe('calculateStartTime', () => {
  it('calculates the earliest start time from sleep intervals', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-02T00:00:00Z',
        stages: [],
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
        ts: '2021-01-01T00:00:00Z',
        stages: [],
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

    const result = calculateStartTime(sleepIntervals);
    expect(result).toBe('2021-01-01T00:00:00Z');
  });

  it('returns an empty string for no sleep intervals', () => {
    const result = calculateStartTime([]);
    expect(result).toBe('');
  });
});
