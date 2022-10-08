import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../screens/LoginScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { ChatNavigator } from './ChatNavigator'

const Stack = createStackNavigator()

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: '사용신청',
          headerTitleAlign: 'center',
        }}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
    </Stack.Navigator>
  )
}
