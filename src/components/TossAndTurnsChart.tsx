import React from 'react';
import { Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get('window').width - 50;

import { StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import { aggregateTimeseriesData } from '../utils';

type Props = {
  sleepIntervals: SleepInterval[];
};

const TossAndTurnsIndicator = ({ sleepIntervals }: Props) => {
  const tntData = aggregateTimeseriesData(sleepIntervals).tnt;
  const count = tntData?.length;
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.dotsContainer}>
        {dots.map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.slateGray,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  countText: {
    color: theme.colors.defaultWhite,
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: 200,
    paddingVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.defaultWhite,
    marginHorizontal: 2,
    marginVertical: 2,
  },
});

export default TossAndTurnsIndicator;
