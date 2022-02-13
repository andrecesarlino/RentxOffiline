import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';

export function AuthRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">      
      <Screen name='SignIn' component={SignIn} />
      <Screen name='FirstStep' component={FirstStep} />
      <Screen name='SecondStep' component={SecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </Navigator>
  )
}