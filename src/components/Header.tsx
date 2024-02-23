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
import EightSleepLogo from '../assets/images/logos/eight-sleep-brand.png';
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
        source={EightSleepLogo}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <View style={styles.rightContainer}>
        <SimpleIcon name="home" size={18} color="#FFF" />
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
    backgroundColor: '#000',
    paddingHorizontal: 10,
    marginTop: platform.ios ? 50 : 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialsText: {
    color: '#FFF',
    marginLeft: 6,
  },
  headerLogo: {
    width: 100,
    height: '50%',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureText: {
    color: '#FFF',
    marginLeft: 6,
  },
});
