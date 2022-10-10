import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RecdReportScreen } from '../screens'
import { ReportScreen } from '../screens'
import { CreateReportScreen } from '../screens'

const Stack = createStackNavigator()

export function RecdReportNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecdReportScreen" component={RecdReportScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="CreateReportScreen" component={CreateReportScreen} />
    </Stack.Navigator>
  )
}
