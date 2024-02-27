import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import {
  calculateFellAsleepTime,
  calculateOutOfBedTime,
  calculateStartTime,
  calculateWakeUpTime,
} from '../utils';
import TimelineEvent from './TimelineEvent';

type Props = {
  sleepIntervals: SleepInterval[];
};

const SleepStageTimeline = ({ sleepIntervals }: Props) => {
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

  const events = [
    { label: 'In Bed', time: startTime, color: theme.colors.fadedSkyBlue },
    { label: 'Fell Asleep', time: fellAsleepTime, color: theme.colors.skyBlue },
    { label: 'Woke Up', time: wakeUpTime, color: theme.colors.skyBlue },
    {
      label: 'Out of Bed',
      time: outOfBedTime,
      color: theme.colors.fadedSkyBlue,
    },
  ];

  return (
    <View style={styles.timeline}>
      {events.map((event, index) => (
        <TimelineEvent
          key={index}
          label={event.label}
          time={event.time}
          color={event.color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    margin: 20,
  },
});

export default SleepStageTimeline;
