import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';
import { TIMEFRAMES, TIMEFRAME_KEY_VALUE } from '../utils/constants';
import InfoDialog from './InfoDialog';

function TimeframeSelector() {
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    TIMEFRAME_KEY_VALUE.DAY,
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.filterContainer}>
      {TIMEFRAMES.map((timeframe, index) => (
        <TouchableOpacity
          key={`${timeframe}-${index}`}
          style={[
            styles.timeframeButton,
            selectedTimeframe === timeframe && styles.selectedTimeframe,
          ]}
          onPress={() => {
            // temporary
            // TODO: normally we'd want to massage data based on the selected timeframe (not have any dialog)
            if (timeframe !== TIMEFRAME_KEY_VALUE.DAY) {
              setIsOpen(true);
            } else {
              setSelectedTimeframe(TIMEFRAME_KEY_VALUE.DAY);
              if (isOpen) {
                setIsOpen(false);
              }
            }
          }}>
          <Text
            style={[
              styles.timeframeText,
              selectedTimeframe === timeframe && { color: 'black' },
            ]}>
            {timeframe}
          </Text>
        </TouchableOpacity>
      ))}
      <InfoDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Coming soon"
        description="This feature is not yet available."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.slateGray,
    marginVertical: 24,
    borderRadius: 10,
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  selectedTimeframe: {
    backgroundColor: theme.colors.defaultWhite,
  },
  timeframeText: {
    color: theme.colors.defaultWhite,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default TimeframeSelector;
