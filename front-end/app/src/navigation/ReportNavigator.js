import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ReportScreen, CreateReportScreen } from '../screens'

const Stack = createStackNavigator()

export default function ReportNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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
    </Stack.Navigator>
  )
}
