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

const RoomTemperatureChart = ({ sleepIntervals }: Props) => {
  const tempRoomC = aggregateTimeseriesData(sleepIntervals).tempRoomC;

  const data = {
    // labels: tempRoomC.map(entry => entry[0]),
    // first, early mid, midpoint, later mid, end
    labels: [
      tempRoomC[0][0],
      tempRoomC[Math.floor(tempRoomC.length / 4)][0],
      tempRoomC[Math.floor(tempRoomC.length / 2)][0],
      tempRoomC[Math.floor((tempRoomC.length * 3) / 4)][0],
      tempRoomC[tempRoomC.length - 1][0],
    ],
    datasets: [
      {
        data: tempRoomC.map(entry => entry[1]),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
    fillShadowGradientFrom: 'red',
    fillShadowGradientTo: 'blue',
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
        formatYLabel={value => `${value}°C`}
        formatXLabel={value => `${moment(value).format('ha')}`}
      />
    </View>
  );
};

export default RoomTemperatureChart;
