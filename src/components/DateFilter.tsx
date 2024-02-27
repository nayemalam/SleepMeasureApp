import moment from 'moment';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import CircularDayScoreSelector from './CircularDayScoreSelector';
import TimeframeSelector from './TimeframeSelector';

type Props = {
  intervals: SleepInterval[];
};

const DateFilter = ({ intervals }: Props) => {
  const { scoresByDate, mostRecentDate } = useMemo(() => {
    const scoresMap: { [key: string]: number[] } = {};
    let latestDate = '';

    intervals.forEach(interval => {
      const dateKey = interval.ts.split('T')[0];
      latestDate =
        !latestDate || moment(dateKey).isAfter(moment(latestDate))
          ? dateKey
          : latestDate;
      scoresMap[dateKey] = [...(scoresMap[dateKey] || []), interval.score];
    });

    const averages = Object.fromEntries(
      Object.entries(scoresMap).map(([date, scores]) => [
        date,
        scores.reduce((acc, curr) => acc + curr, 0) / scores.length,
      ]),
    );

    return { scoresByDate: averages, mostRecentDate: latestDate };
  }, [intervals]);

  const mostRecentUniqueDate = useMemo(
    () => (mostRecentDate || '').split('T')[0],
    [mostRecentDate],
  );

  const averageScoreForSelectedDate = useMemo(() => {
    return scoresByDate[mostRecentUniqueDate] || 0;
  }, [scoresByDate, mostRecentUniqueDate]);

  const [selectedDate, setSelectedDate] = React.useState(mostRecentUniqueDate);

  return (
    <View style={styles.container}>
      <TimeframeSelector />

      {!scoresByDate[selectedDate] && mostRecentDate && (
        <TouchableOpacity
          // style={styles.mostRecentButton}
          onPress={() => setSelectedDate(mostRecentDate)}>
          <Text style={styles.mostRecentButtonText}>
            Go to Most Recent Date
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.dateText}>
        {moment(selectedDate).format('ddd, MMMM D, YYYY')}
      </Text>

      <CircularDayScoreSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        scoresByDate={scoresByDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mostRecentButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  mostRecentButtonText: {
    color: theme.colors.defaultWhite,
    textAlign: 'center',
  },
  container: {
    backgroundColor: theme.colors.defaultBlack,
  },

  dateText: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
    paddingBottom: 16,
    textAlign: 'center',
  },
});

export default DateFilter;
