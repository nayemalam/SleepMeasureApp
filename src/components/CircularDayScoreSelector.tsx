import moment from 'moment';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { theme } from '../styles/theme';

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  scoresByDate: { [key: string]: number };
};

const CircularDayScoreSelector = ({
  selectedDate,
  setSelectedDate,
  scoresByDate,
}: Props) => {
  const dayCircles = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const dayMoment = moment(selectedDate).startOf('isoWeek').add(i, 'days');
      const dayKey = dayMoment.format('YYYY-MM-DD');
      const score = scoresByDate[dayKey] || 0;
      const isSelected = dayMoment.isSame(selectedDate, 'day');

      return (
        <TouchableOpacity
          key={dayKey}
          onPress={() => setSelectedDate(dayKey)}
          style={[
            styles.dayCircle,
            isSelected && styles.selectedDay,
            score === 100 && { backgroundColor: theme.colors.skyBlue },
          ]}>
          <AnimatedCircularProgress
            size={36}
            width={2}
            fill={(score * 100) / 100}
            tintColor={theme.colors.skyBlue}
            rotation={180}
            backgroundColor={theme.colors.darkGrayBlue}>
            {() => (
              <Text style={styles.scoreText}>{dayMoment.format('dd')[0]}</Text>
            )}
          </AnimatedCircularProgress>
          {isSelected && <View style={styles.activeCircle} />}
        </TouchableOpacity>
      );
    });
  }, [selectedDate, scoresByDate]);

  return <View style={styles.daySelector}>{dayCircles}</View>;
};

const styles = StyleSheet.create({
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    position: 'relative',
  },
  selectedDay: {
    opacity: 1,
  },
  scoreText: {
    fontSize: 12,
    color: theme.colors.defaultWhite,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeCircle: {
    position: 'absolute',
    top: 40,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.defaultWhite,
  },
});

export default CircularDayScoreSelector;
