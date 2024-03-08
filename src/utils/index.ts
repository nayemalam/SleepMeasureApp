import moment, { Moment } from 'moment';
import {
  HeartRate,
  RespiratoryRate,
  SleepInterval,
  SleepStage,
  TimeSeriesDataKey,
  TossNTurn,
} from '../types';
import { TempBedC, TempRoomC, TimeSeriesData } from './../types/index';
import { SleepStageKeyValue } from './constants';

export const sleepScoreLabel = (score: number) => {
  if (score < 60) {
    return 'Poor';
  }
  if (score < 80) {
    return 'Fair';
  }
  if (score < 90) {
    return 'Good';
  }
  return 'Excellent';
};

export const aggregateTimeseriesData = (
  sleepIntervals: SleepInterval[],
): TimeSeriesData => {
  const aggregatedTimeseries: TimeSeriesData = {
    tnt: [],
    tempRoomC: [],
    tempBedC: [],
    respiratoryRate: [],
    heartRate: [],
  };

  sleepIntervals.forEach(interval => {
    (Object.keys(aggregatedTimeseries) as TimeSeriesDataKey[]).forEach(key => {
      if (interval.timeseries[key]) {
        aggregatedTimeseries[key] = [
          ...aggregatedTimeseries[key],
          ...(interval.timeseries[key] as
            | TempRoomC[]
            | TempBedC[]
            | HeartRate[]
            | RespiratoryRate[]),
        ];
      }
    });
  });

  return aggregatedTimeseries;
};

export const aggregateStages = (
  sleepIntervals: SleepInterval[],
): SleepStage[] => {
  return sleepIntervals?.reduce((acc: SleepStage[], curr: SleepInterval) => {
    return [...acc, ...curr.stages];
  }, []);
};

export const aggregateTossNTurns = (
  sleepIntervals: SleepInterval[],
): TossNTurn[] => {
  return sleepIntervals.reduce((acc: TossNTurn[], curr: SleepInterval) => {
    return [...acc, ...curr.timeseries.tnt];
  }, []);
};

export const calculateStartTime = (sleepIntervals: SleepInterval[]): string => {
  return sleepIntervals.reduce(
    (acc, session) => (!acc || session.ts < acc ? session.ts : acc),
    '',
  );
};

export const calculateOutOfBedTime = (
  sleepIntervals: SleepInterval[],
): Moment => {
  const lastInterval = sleepIntervals[sleepIntervals.length - 1];
  const lastIntervalEndTime = moment(lastInterval.ts);
  lastInterval.stages.forEach(stage => {
    lastIntervalEndTime.add(stage.duration, 'seconds');
  });
  const outOfBedTime = lastIntervalEndTime;
  return outOfBedTime;
};

export const calculateFellAsleepTime = (
  sleepIntervals: SleepInterval[],
  startTime: string,
): Moment => {
  const aggregatedStages = aggregateStages(sleepIntervals);
  let fellAsleepTime = moment(startTime);
  for (const stage of aggregatedStages) {
    // exit the first time when we find a sleep stage
    if (
      stage.stage === SleepStageKeyValue.light ||
      stage.stage === SleepStageKeyValue.deep
    ) {
      break;
    }
    fellAsleepTime.add(stage.duration, 'seconds');
  }

  return fellAsleepTime;
};

export const calculateWakeUpTime = (
  sleepIntervals: SleepInterval[],
  startTime: string,
): Moment => {
  let wakeUpTime = moment(startTime);
  sleepIntervals.forEach(interval => {
    let intervalEndTime = moment(interval.ts);
    interval.stages.forEach(stage => {
      intervalEndTime.add(stage.duration, 'seconds');
      // sets the wake up time to the end of the awake stage
      if (stage.stage === SleepStageKeyValue.awake) {
        wakeUpTime = moment(intervalEndTime);
      }
    });
  });

  return wakeUpTime;
};

export const calculateTotalDurationAsleep = (
  sleepIntervals: SleepInterval[],
): number => {
  return sleepIntervals.reduce((acc, session) => {
    const duration = session.stages.reduce((stageAcc, stage) => {
      // excludes awake, out stages from the total sleep duration
      if (
        stage.stage === SleepStageKeyValue.awake ||
        stage.stage === SleepStageKeyValue.out
      ) {
        return stageAcc;
      }
      return stageAcc + stage.duration;
    }, 0);
    return acc + duration;
  }, 0);
};

export const renderSleepStatus = (
  hoursSlept: number,
  deepSleepHours: number,
  lightSleepHours: number,
) => {
  // TODO: note these hours are just hypothetical
  // if the user has slept more than 8 hours, they are well-rested
  if (hoursSlept >= deepSleepHours) {
    return '🤩';
    // if the user has slept more than 6 hours, they are in light sleep
  } else if (hoursSlept >= lightSleepHours) {
    return '😌';
    // if the user has slept less than 6 hours, they are sleep deprived
  } else {
    return '☕️';
  }
};
