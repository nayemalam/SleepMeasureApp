import { Platform } from 'react-native';
import { SleepStage as SleepStageType, TIMEFRAMES_TYPE } from '../types';
import { DetailsType, TIMEFRAME_KEY_VALUE_TYPE } from './../types/index';

export const platform = {
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',
};

export const SleepStageKeyValue: Record<
  SleepStageType['stage'],
  SleepStageType['stage']
> = {
  out: 'out',
  awake: 'awake',
  light: 'light',
  deep: 'deep',
};

export const SleepStageLabels: { [key in SleepStageType['stage']]: string } = {
  out: 'out of bed',
  awake: 'in bed, awake',
  light: 'in light sleep',
  deep: 'in deep sleep',
};

export const TIMEFRAMES: TIMEFRAMES_TYPE[] = ['DAY', 'WEEK', 'MONTH', 'YEAR'];

export const TIMEFRAME_KEY_VALUE: TIMEFRAME_KEY_VALUE_TYPE = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const DetailsTypeLabels: { [key in DetailsType]: string } = {
  tnt: 'Toss and Turn',
  heartRate: 'Heart Rate',
  respiratoryRate: 'Respiratory Rate',
  tempBedC: 'Bed Temperature',
  tempRoomC: 'Room Temperature',
  stages: 'Sleep Stages',
};
