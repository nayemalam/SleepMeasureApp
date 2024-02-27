import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { SleepInterval, SleepStage } from '../types';
import { aggregateStages } from '../utils';
import { SleepStageLabels } from '../utils/constants';

type Props = {
  sleepIntervals: SleepInterval[];
};

const SleepStageDetails = ({ sleepIntervals }: Props) => {
  const aggregatedStages = aggregateStages(sleepIntervals);

  const stageCounts = useMemo(() => {
    return aggregatedStages?.reduce((acc, { stage }) => {
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {} as Record<SleepStage['stage'], number>);
  }, [aggregatedStages]);

  return (
    <View>
      {Object.entries(stageCounts).map(([stage, count]) => (
        <View key={stage} style={styles.stageRow}>
          <Text style={styles.stageName}>
            {SleepStageLabels[stage as SleepStage['stage']]}
          </Text>
          <Text style={styles.stageCount}>{count} times</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  stageName: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
  },
  stageCount: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SleepStageDetails;
