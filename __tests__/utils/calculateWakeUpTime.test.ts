import moment from 'moment';
import { SleepInterval } from '../../src/types';
import { calculateWakeUpTime } from '../../src/utils';

describe('calculateWakeUpTime', () => {
  it('calculates the wake-up time from the sleep intervals', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [{ stage: 'awake', duration: 300 }],
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
        stages: [{ stage: 'awake', duration: 600 }],
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

    const result = calculateWakeUpTime(sleepIntervals, '2021-01-01T00:00:00Z');
    expect(result.isSame(moment('2021-01-01T05:10:00Z'))).toBeTruthy();
  });
});
