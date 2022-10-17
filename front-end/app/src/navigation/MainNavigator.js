import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import ReportNavigator from './ReportNavigator'
import ChatNavigator from './ChatNavigator'
import SettingNavigator from './SettingNavigator'
import { LoginScreen, SignUpScreen } from '../screens'

const Stack = createStackNavigator()

export default function MainNavigator({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: '사용신청', headerShown: true }}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ReportNavigator" component={ReportNavigator} />
      <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
      <Stack.Screen name="SettingNavigator" component={SettingNavigator} />
    </Stack.Navigator>
  )
}
