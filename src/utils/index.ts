import moment, { Moment } from 'moment';
import {
  HeartRate,
  RespiratoryRate,
  SleepInterval,
  SleepStage,
  TimeSeriesDataKey,
} from '../types';
import { TempBedC, TempRoomC, TimeSeriesData } from './../types/index';

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
      const data = interval.timeseries[key];
      switch (key) {
        case 'tnt':
          // For arrays of numbers, we can directly concatenate.
          aggregatedTimeseries[key] = aggregatedTimeseries[key].concat(
            data as number[],
          );
          break;
        case 'respiratoryRate':
        case 'heartRate':
        case 'tempRoomC':
        case 'tempBedC':
          // For arrays of tuples, we also concatenate directly, thanks to the explicit type casting.
          aggregatedTimeseries[key] = aggregatedTimeseries[key].concat(
            data as TempRoomC[] | TempBedC[] | HeartRate[] | RespiratoryRate[],
          );
          break;
        default:
          // Ideally, you shouldn't reach here. This is just for exhaustive type checking.
          throw new Error(`Unhandled timeseries data key: ${key}`);
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
export const calculateStartTime = (sleepIntervals: SleepInterval[]): string => {
  return sleepIntervals.reduce(
    (acc, session) => (!acc || session.ts < acc ? session.ts : acc),
    '',
  );
};

// Function to calculate the end time of the last interval
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

// Function to calculate the time when the user fell asleep
export const calculateFellAsleepTime = (
  sleepIntervals: SleepInterval[],
  startTime: string,
): Moment => {
  const aggregatedStages = aggregateStages(sleepIntervals);
  let fellAsleepTime = moment(startTime); // Initialize with the in bed time
  for (const stage of aggregatedStages) {
    if (stage.stage === 'light' || stage.stage === 'deep') {
      break; // Stop at the first light or deep sleep stage
    }
    fellAsleepTime.add(stage.duration, 'seconds');
  }

  return fellAsleepTime;
};

// Function to calculate wake up time
export const calculateWakeUpTime = (
  sleepIntervals: SleepInterval[],
  startTime: string,
): Moment => {
  let wakeUpTime = moment(startTime);
  sleepIntervals.forEach(interval => {
    let intervalEndTime = moment(interval.ts);
    interval.stages.forEach(stage => {
      intervalEndTime.add(stage.duration, 'seconds');
      if (stage.stage === 'awake') {
        wakeUpTime = moment(intervalEndTime); // This will end up being the last "awake" stage found
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
      // Exclude 'awake' stages from the total sleep duration
      if (stage.stage === 'awake') {
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
  // if the user has slept more than 8 hours, they are well-rested
  if (hoursSlept >= deepSleepHours) {
    return '🤩';
    // if the user has slept more than 6 hours, they are in light sleep
  } else if (hoursSlept >= lightSleepHours) {
    return '🥱';
    // if the user has slept less than 6 hours, they are sleep deprived
  } else {
    return '☕️';
  }
};
