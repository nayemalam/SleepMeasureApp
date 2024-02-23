import React from 'react';
import {
  StatusBar as RNStatusBar,
  SafeAreaView,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native';
import { platform } from '../utils/constants';

type Props = StatusBarProps & {
  backgroundColor: string;
};

export const StatusBar = ({ backgroundColor, ...props }: Props) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <RNStatusBar backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = RNStatusBar.currentHeight;
const APPBAR_HEIGHT = platform.ios ? 3000 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
