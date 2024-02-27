import moment from 'moment';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import {
  calculateFellAsleepTime,
  calculateOutOfBedTime,
  calculateStartTime,
  calculateWakeUpTime,
} from '../utils';

type Props = {
  sleepIntervals: SleepInterval[];
};

export default function SleepStageTimelineDetails({ sleepIntervals }: Props) {
  const startTime = useMemo(
    () => calculateStartTime(sleepIntervals),
    [sleepIntervals],
  );
  const fellAsleepTime = useMemo(
    () => calculateFellAsleepTime(sleepIntervals, startTime),
    [sleepIntervals, startTime],
  );
  const wakeUpTime = useMemo(
    () => calculateWakeUpTime(sleepIntervals, startTime),
    [sleepIntervals, startTime],
  );
  const outOfBedTime = useMemo(
    () => calculateOutOfBedTime(sleepIntervals),
    [sleepIntervals],
  );

  return (
    <View style={styles.container}>
      <View style={styles.timelineRow}>
        <View style={styles.titleDescColumn}>
          <Text style={styles.time}>{moment(startTime).format('h:mm a')}</Text>
          <Text style={styles.sleepStatus}>In bed</Text>
        </View>

        <View style={styles.titleDescColumn}>
          <Text
            style={[
              styles.time,
              {
                textAlign: 'right',
              },
            ]}>
            {outOfBedTime.format('h:mm a')}
          </Text>
          <Text style={styles.sleepStatus}>Out of bed</Text>
        </View>
      </View>

      <Divider />

      <View style={styles.timelineRow}>
        <View style={styles.titleDescColumn}>
          <Text style={styles.time}>{fellAsleepTime.format('h:mm a')}</Text>
          <Text style={styles.sleepStatus}>Fell asleep</Text>
        </View>

        <View style={styles.titleDescColumn}>
          <Text
            style={[
              styles.time,
              {
                textAlign: 'right',
              },
            ]}>
            {wakeUpTime.format('h:mm a')}
          </Text>
          <Text style={styles.sleepStatus}>Awake</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  timelineRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  titleDescColumn: {
    display: 'flex',
    gap: 5,
  },
  time: {
    fontWeight: 'bold',
    color: theme.colors.defaultWhite,
  },
  sleepStatus: {
    color: theme.colors.lightGray,
    fontSize: 12,
    textAlign: 'right',
  },
});
