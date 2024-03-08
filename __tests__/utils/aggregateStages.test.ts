import { SleepInterval } from '../../src/types';
import { aggregateStages } from '../../src/utils';

describe('aggregateStages', () => {
  it('aggregates stages from multiple sleep intervals', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [{ stage: 'light', duration: 300 }],
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
        stages: [{ stage: 'deep', duration: 450 }],
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

    const result = aggregateStages(sleepIntervals);
    expect(result).toEqual([
      { stage: 'light', duration: 300 },
      { stage: 'deep', duration: 450 },
    ]);
  });

  it('returns an empty array for no sleep intervals', () => {
    const result = aggregateStages([]);
    expect(result).toEqual([]);
  });
});
