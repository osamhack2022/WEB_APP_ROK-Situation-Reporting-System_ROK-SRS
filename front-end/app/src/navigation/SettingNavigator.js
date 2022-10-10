import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { UserMgtScreen, SettingScreen } from '../screens'

const Stack = createStackNavigator()

export function SettingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ title: '설 정' }}
      />
      <Stack.Screen
        name="UserMgtScreen"
        component={UserMgtScreen}
        options={{ title: '사용자 관리' }}
      />
    </Stack.Navigator>
  )
}
