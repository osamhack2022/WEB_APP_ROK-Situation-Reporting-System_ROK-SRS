import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatRoomScreen } from '../screens/bottom-tab-screens'
import { TabNavigator } from './TabNavigator'

const Stack = createStackNavigator()

export function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ title: '김형민', headerShown: true }}
      />
    </Stack.Navigator>
  )
}
