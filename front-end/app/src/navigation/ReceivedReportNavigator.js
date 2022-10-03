import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ReceivedReportScreen } from '../screens/bottom-tab-screens'
import { ReportScreen } from '../screens/bottom-tab-screens'

const Stack = createStackNavigator()

export function ReceivedReportNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReceivedReportScreen"
        component={ReceivedReportScreen}
      />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  )
}
