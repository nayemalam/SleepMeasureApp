import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SleepLogo from '../assets/images/sleep-logo.png';
import { theme } from '../styles/theme';
import { platform } from '../utils/constants';
import Avatar from './Avatar';

export const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.headerContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <Avatar text="NA" />
      <Image
        source={SleepLogo}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <View style={styles.rightContainer}>
        <SimpleIcon name="home" size={18} color={theme.colors.defaultWhite} />
        <Text style={styles.temperatureText}>76°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.defaultBlack,
    paddingHorizontal: 10,
    marginTop: platform.ios ? 50 : 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialsText: {
    color: theme.colors.defaultWhite,
    marginLeft: 6,
  },
  headerLogo: {
    width: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureText: {
    color: theme.colors.defaultWhite,
    marginLeft: 6,
  },
});
