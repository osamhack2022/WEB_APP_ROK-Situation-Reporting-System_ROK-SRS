import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatRoomScreen } from '../screens'

const Stack = createStackNavigator()

export default function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ title: '병장 김형민' }}
      />
    </Stack.Navigator>
  )
}
