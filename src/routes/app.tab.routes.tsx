import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

export function AppTabRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">      
      <Screen name='Home' component={Home} />
      <Screen name='Profile' component={Home} />
      <Screen name='MyCars' component={MyCars} /> 
    </Navigator>
  )
}