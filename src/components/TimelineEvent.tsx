import moment, { Moment } from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

type Props = {
  label: string;
  time: string | Moment;
  color: string;
};

const TimelineEvent = ({ label, time, color }: Props) => {
  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventLabel}>{label}</Text>
      <View style={styles.lineContainer}>
        <View style={[styles.verticalLine, { backgroundColor: color }]} />
      </View>
      <Text style={styles.eventTime}>{moment(time).format('h:mm A')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  lineContainer: {
    flex: 1,
    alignItems: 'center',
    height: 70,
    marginBottom: -20,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    zIndex: -1,
  },
  eventLabel: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 16,
    color: theme.colors.defaultWhite,
  },
  eventTime: {
    flex: 1,
    fontSize: 20,
    color: theme.colors.defaultWhite,
  },
});

export default TimelineEvent;
