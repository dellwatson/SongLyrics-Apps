import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'

// import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  Main: HomeScreen 
  // Main: MainTabNavigator,
}));