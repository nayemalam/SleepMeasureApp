import { SleepInterval, TimeSeriesData } from '../../src/types';
import { aggregateTimeseriesData } from '../../src/utils';

describe('aggregateTimeseriesData', () => {
  it('aggregates timeseries data from multiple sleep intervals', () => {
    const sleepIntervals: SleepInterval[] = [
      {
        id: '1',
        ts: '2021-01-01T00:00:00Z',
        stages: [],
        timeseries: {
          tnt: [['2021-01-01T01:00:00Z', 1]],
          tempRoomC: [['2021-01-01T01:00:00Z', 22]],
          tempBedC: [['2021-01-01T01:00:00Z', 30]],
          respiratoryRate: [['2021-01-01T01:00:00Z', 15]],
          heartRate: [['2021-01-01T01:00:00Z', 60]],
        },
        score: 90,
      },
      {
        id: '2',
        ts: '2021-01-02T00:00:00Z',
        stages: [],
        timeseries: {
          tnt: [['2021-01-02T01:00:00Z', 3]],
          tempRoomC: [['2021-01-02T01:00:00Z', 23]],
          tempBedC: [['2021-01-02T01:00:00Z', 31]],
          respiratoryRate: [['2021-01-02T01:00:00Z', 16]],
          heartRate: [['2021-01-02T01:00:00Z', 61]],
        },
        score: 80,
      },
    ];

    const expectedResult: TimeSeriesData = {
      tnt: [
        ['2021-01-01T01:00:00Z', 1],
        ['2021-01-02T01:00:00Z', 3],
      ],
      tempRoomC: [
        ['2021-01-01T01:00:00Z', 22],
        ['2021-01-02T01:00:00Z', 23],
      ],
      tempBedC: [
        ['2021-01-01T01:00:00Z', 30],
        ['2021-01-02T01:00:00Z', 31],
      ],
      respiratoryRate: [
        ['2021-01-01T01:00:00Z', 15],
        ['2021-01-02T01:00:00Z', 16],
      ],
      heartRate: [
        ['2021-01-01T01:00:00Z', 60],
        ['2021-01-02T01:00:00Z', 61],
      ],
    };

    const result = aggregateTimeseriesData(sleepIntervals);
    expect(result).toEqual(expectedResult);
  });

  it('handles empty sleep intervals array', () => {
    const result = aggregateTimeseriesData([]);
    expect(result).toEqual({
      tnt: [],
      tempRoomC: [],
      tempBedC: [],
      respiratoryRate: [],
      heartRate: [],
    });
  });
});
