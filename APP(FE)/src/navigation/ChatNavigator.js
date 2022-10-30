import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatRoomScreen, CreateChatScreen } from '../screens'

const Stack = createStackNavigator()

export default function ChatNavigator({ route }) {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
      <Stack.Screen
        name="CreateChatScreen"
        component={CreateChatScreen}
        options={{ title: '새 채팅방 생성' }}
      />
    </Stack.Navigator>
  )
}
