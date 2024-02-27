import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../styles/theme';
import SleepStagesChart from './SleepStagesChart';

const SleepStagesCard = ({ memberSleepInfo }) => {
  const intervalsWithColor = memberSleepInfo[0]?.stages?.map(stage => ({
    ...stage,
    color: getColorForStage(stage?.stage),
  }));

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.cardTitle}>Sleep Stages</Text>
        <IconButton icon="information" style={styles.infoIcon} />
      </View>
      <SleepStagesChart stages={memberSleepInfo[0].stages} />
    </View>
  );
};

const getColorForStage = stage => {
  switch (stage) {
    case 'awake':
      return '#FF0000';
    case 'light':
      return '#00FF00';
    case 'deep':
      return '#0000FF';
    case 'rem':
      return '#FFFF00';
    default:
      return '#FFFFFF';
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: theme.colors.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SleepStagesCard;
