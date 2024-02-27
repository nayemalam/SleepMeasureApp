import moment from 'moment';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import {
  calculateFellAsleepTime,
  calculateStartTime,
  calculateTotalDurationAsleep,
  calculateWakeUpTime,
  renderSleepStatus,
} from '../utils';

// ideally the family member can set this up themselves in their profiles otherwise we can suggest one based on statistics, should not be hardcoded constant
const deepSleepHours = 8;
const lightSleepHours = 6;

type Props = {
  sleepIntervals: SleepInterval[];
};

const TimeSlept = ({ sleepIntervals }: Props) => {
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
  const totalDurationAsleep = useMemo(
    () => calculateTotalDurationAsleep(sleepIntervals),
    [sleepIntervals],
  );

  const totalDuration = totalDurationAsleep / 3600;
  const totalHours = Math.floor(totalDuration);
  const totalMinutes = Math.floor((totalDuration - totalHours) * 60);

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.todayText}>
          Today {totalHours}h {totalMinutes}m{' '}
        </Text>

        <ProgressBar
          progress={totalDuration / deepSleepHours}
          color={theme.colors.skyBlue}
          style={styles.progressBar}
        />
        <View style={styles.minAndMaxTimeContainer}>
          <Text style={styles.minTime}>
            {moment(fellAsleepTime).format('h:mm a')}
          </Text>
          <Text style={styles.maxTime}>{wakeUpTime.format('h:mm a')}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.sleepStatus}>
          {renderSleepStatus(totalHours, deepSleepHours, lightSleepHours)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.slateGray,
  },
  todayText: {
    fontSize: 18,
    color: theme.colors.defaultWhite,
  },
  timeContainer: {
    flex: 1,
    marginRight: 20,
  },
  progressBar: {
    marginTop: 10,
  },
  minAndMaxTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  minTime: {
    color: theme.colors.defaultWhite,
  },
  maxTime: {
    color: theme.colors.defaultWhite,
  },
  statusContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.skyBlue,
  },
  sleepStatus: { fontSize: 24, color: theme.colors.skyBlue },
});

export default TimeSlept;
