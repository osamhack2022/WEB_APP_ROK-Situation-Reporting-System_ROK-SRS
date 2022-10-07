import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SentReportScreen } from '../screens/bottom-tab-screens'
import { ReportScreen } from '../screens/bottom-tab-screens'

const Stack = createStackNavigator()

export function SentReportNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SentReportScreen" component={SentReportScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  )
}
