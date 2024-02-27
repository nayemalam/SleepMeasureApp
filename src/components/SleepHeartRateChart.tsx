import moment from 'moment';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import { aggregateTimeseriesData } from '../utils';

type Props = {
  sleepIntervals: SleepInterval[];
};

const SleepHeartRateChart = ({ sleepIntervals }: Props) => {
  const heartRateData = aggregateTimeseriesData(sleepIntervals).heartRate;

  const labels = heartRateData.map(entry => entry[0]);
  const formattedLabels = labels.map(label => moment(label).format('ha'));

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        data: heartRateData.map(entry => entry[1]),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.slateGray,
    backgroundGradientTo: theme.colors.slateGray,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: '3',
      strokeWidth: '2',
    },
    decimalPlaces: 0,
  };

  const screenWidth = Dimensions.get('window').width - 50;

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withInnerLines={false}
        formatYLabel={value => `${value}bpm`}
      />
    </View>
  );
};

export default SleepHeartRateChart;
