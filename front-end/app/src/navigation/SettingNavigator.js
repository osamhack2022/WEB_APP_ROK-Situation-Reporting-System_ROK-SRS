import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  SettingScreen,
  UnitMgtScreen,
  UserMgtScreen,
  UserAddScreen,
} from '../screens'

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
      <Stack.Screen
        name="UserAddScreen"
        component={UserAddScreen}
        options={{ title: '사용자 추가' }}
      />
      <Stack.Screen
        name="UnitMgtScreen"
        component={UnitMgtScreen}
        options={{ title: '부대 관리' }}
      />
    </Stack.Navigator>
  )
}
