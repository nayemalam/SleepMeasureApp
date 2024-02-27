import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

type Props = {
  text: string;
};
function Avatar({ text }: Props) {
  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{text}</Text>
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#498BA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: theme.colors.defaultWhite,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
