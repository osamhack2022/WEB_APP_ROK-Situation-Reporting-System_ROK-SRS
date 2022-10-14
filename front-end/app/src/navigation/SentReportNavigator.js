import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SentReportScreen } from '../screens'
import { ReportScreen } from '../screens'

const Stack = createStackNavigator()

export function SentReportNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SentReportScreen" component={SentReportScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  )
}
