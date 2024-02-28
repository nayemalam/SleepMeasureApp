import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Header } from '../components/Header';
import DetailsScreen from '../screens/Details';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        header: () => <Header />,
        headerTintColor: theme.colors.defaultWhite,
        headerStyle: {
          backgroundColor: theme.colors.defaultBlack,
        },
      }}>
      <Stack.Screen component={MainTabNavigator} name="MainTab" />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
