import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: 'transparent',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home-variant"
              size={24}
              color={focused ? '#fff' : '#888'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="family-tree"
              size={24}
              color={focused ? '#fff' : '#888'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
