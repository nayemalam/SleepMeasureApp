import moment from 'moment';
import { SleepInterval } from '../../src/types';
import { calculateFellAsleepTime } from '../../src/utils';

describe('calculateFellAsleepTime', () => {
  it('calculates the time the user fell asleep', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [
          { stage: 'awake', duration: 300 },
          { stage: 'light', duration: 600 },
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
    ];

    const result = calculateFellAsleepTime(
      sleepIntervals,
      '2021-01-01T00:00:00Z',
    );
    expect(result.isSame(moment('2021-01-01T00:05:00Z'))).toBeTruthy();
  });
});
