import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { TabNavigator } from './TabNavigator'
import {
  ReportScreen,
  CreateReportScreen,
  ChatRoomScreen,
  UserUpdateScreen,
  UserAddScreen,
  UserMgtScreen,
  UnitMgtScreen,
  ProcMgtScreen,
} from '../screens'

const Stack = createStackNavigator()

export default function MainNavigator({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ title: '사용신청' }}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ title: '메모보고' }}
      />
      <Stack.Screen
        name="CreateReportScreen"
        component={CreateReportScreen}
        options={{ title: '메모보고 생성' }}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ title: '병장 김형민' }}
      />
      <Stack.Screen
        name="UserUpdateScreen"
        component={UserUpdateScreen}
        options={{ title: '내 정보 수정' }}
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
      <Stack.Screen
        name="ProcMgtScreen"
        component={ProcMgtScreen}
        options={{ title: '보고체계 관리' }}
      />
    </Stack.Navigator>
  )
}
