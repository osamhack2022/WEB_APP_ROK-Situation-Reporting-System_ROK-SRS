import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  UserUpdateScreen,
  UserAddScreen,
  UserMgtScreen,
  UnitMgtScreen,
  UnitAddScreen,
  SysMgtScreen,
} from '../screens'

const Stack = createStackNavigator()

export default function SettingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="UserUpdateScreen"
        component={UserUpdateScreen}
        options={{ title: '내 정보 관리' }}
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
        options={{ title: '부대 정보 관리' }}
      />
      <Stack.Screen
        name="UnitAddScreen"
        component={UnitAddScreen}
        options={{ title: '부대 추가' }}
      />
      <Stack.Screen
        name="SysMgtScreen"
        component={SysMgtScreen}
        options={{ title: '보고체계 관리' }}
      />
    </Stack.Navigator>
  )
}
