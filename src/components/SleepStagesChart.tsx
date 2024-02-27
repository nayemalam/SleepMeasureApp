import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { theme } from '../styles/theme';
import { SleepInterval } from '../types';
import { aggregateStages } from '../utils';

const screenWidth = Dimensions.get('window').width - 50;

type Props = {
  sleepIntervals: SleepInterval[];
};

const SleepStagesChart = ({ sleepIntervals }: Props) => {
  const aggregatedStages = aggregateStages(sleepIntervals);

  const totalDurationByStage = aggregatedStages.reduce(
    (acc: Record<string, number>, stage) => {
      const { stage: stageName, duration } = stage;
      if (!acc[stageName]) {
        acc[stageName] = 0;
      }
      acc[stageName] += duration;
      return acc;
    },
    {},
  );

  const chartData: ChartData = {
    labels: Object.keys(totalDurationByStage),
    datasets: [
      {
        data: Object.values(totalDurationByStage).map(
          duration => duration / 3600,
        ),
        colors: [
          (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
          (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
          (opacity = 1) => `rgba(153, 102, 255, ${opacity})`,
          (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        ],
      },
    ],
  };

  const chartConfig: AbstractChartConfig = {
    backgroundColor: theme.colors.slateGray,
    backgroundGradientFrom: theme.colors.slateGray,
    backgroundGradientTo: theme.colors.slateGray,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
    barRadius: 3,
    decimalPlaces: 2,
    formatTopBarValue: (value: number) => value.toFixed(2) + 'h',
  };

  return (
    <View style={styles.card}>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chartStyle}
        yAxisSuffix="h"
        yAxisInterval={1}
        fromZero
        withInnerLines={false}
        showValuesOnTopOfBars
        yAxisLabel=""
        withCustomBarColorFromData
        flatColor
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.slateGray,
    borderRadius: 16,
    padding: 16,
  },
  chartStyle: {
    borderRadius: 16,
  },
  label: {
    color: theme.colors.defaultWhite,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default SleepStagesChart;
