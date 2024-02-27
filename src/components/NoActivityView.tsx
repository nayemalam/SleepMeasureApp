import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';
import { FamilyMember } from '../types';

type Props = {
  familyMember: FamilyMember;
  onSeeLastData: () => void;
};

function NoActivityView({ familyMember, onSeeLastData }: Props) {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Activity</Text>
      <Text style={styles.noDataSubText}>
        No sleep data available for {familyMember.name}.
      </Text>
      <TouchableOpacity style={styles.seeDataButton} onPress={onSeeLastData}>
        <Text style={styles.seeDataButtonText}>See last sleep data</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.defaultBlack,
    padding: 20,
    height: 400,
  },
  noDataText: {
    fontSize: 24,
    color: theme.colors.defaultWhite,
    marginBottom: 10,
  },
  noDataSubText: {
    fontSize: 16,
    color: theme.colors.defaultWhite,
    marginBottom: 20,
    textAlign: 'center',
  },
  seeDataButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: theme.colors.charcoalGray,
  },
  seeDataButtonText: {
    color: theme.colors.defaultWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NoActivityView;
