import { Platform } from 'react-native';

export const challengeIds = [
  '2228b530e055401f81ba37b51ff6f81d',
  'd6c1355e38194139b8d0c870baf86365',
  'f9bf229fd19e4c799e8c19a962d73449',
];

export const platform = {
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',
};
