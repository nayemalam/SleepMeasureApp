export interface SleepStage {
  stage: 'out' | 'awake' | 'light' | 'deep';
  duration: number;
}

export interface TimeSeriesData {
  tnt: number[];
  tempRoomC: number[];
  tempBedC: number[];
  respiratoryRate: number[];
  heartRate: number[];
}

export interface SleepInterval {
  id: string;
  ts: string;
  stages: SleepStage[];
  timeseries: TimeSeriesData;
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

export type RootStackParamList = {
  MainTab: undefined;
  Home: undefined;
  Profile: {
    familyMember: FamilyMember;
  };
};
