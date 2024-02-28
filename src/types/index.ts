export interface SleepStage {
  stage: 'out' | 'awake' | 'light' | 'deep';
  duration: number;
}

export type TempRoomC = [string, number];

export type TempBedC = [string, number];

export type RespiratoryRate = [string, number];

export type HeartRate = [string, number];

export type TossNTurn = [string, number];

export interface TimeSeriesData {
  tnt: TossNTurn[];
  tempRoomC: TempRoomC[];
  tempBedC: TempBedC[];
  respiratoryRate: RespiratoryRate[];
  heartRate: HeartRate[];
}

export type TimeSeriesDataKey = keyof TimeSeriesData;

export interface SleepInterval {
  id: string;
  ts: string;
  stages: SleepStage[];
  timeseries: TimeSeriesData;
  score: number;
}

export interface FamilyMemberData {
  intervals: SleepInterval[];
}

export type FamilyMember = {
  id: string;
  name: string;
  age: number;
  relation: string;
};

export type DetailsType = TimeSeriesDataKey | 'stages';

export type RootStackParamList = {
  MainTab: undefined;
  Home: undefined;
  Profile: {
    familyMember: FamilyMember;
  };
  Details: {
    sleepIntervals: SleepInterval[];
    type: DetailsType;
  };
};

export type TIMEFRAMES_TYPE = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export type TIMEFRAME_KEY_VALUE_TYPE = Record<TIMEFRAMES_TYPE, TIMEFRAMES_TYPE>;
