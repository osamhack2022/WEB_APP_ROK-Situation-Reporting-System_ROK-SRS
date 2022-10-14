import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatRoomScreen } from '../screens'
import { TabNavigator } from './TabNavigator'

const Stack = createStackNavigator()

export function ChatNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ title: '병장 김형민', headerShown: true }}
      />
    </Stack.Navigator>
  )
}
