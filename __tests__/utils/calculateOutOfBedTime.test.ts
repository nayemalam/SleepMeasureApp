import moment from 'moment';
import { SleepInterval } from '../../src/types';
import { calculateOutOfBedTime } from '../../src/utils';

describe('calculateOutOfBedTime', () => {
  it('calculates the out of bed time from the last sleep interval', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [{ stage: 'out', duration: 600 }],
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

    const result = calculateOutOfBedTime(sleepIntervals);
    expect(result.isSame(moment('2021-01-01T00:10:00Z'))).toBeTruthy();
  });
});
