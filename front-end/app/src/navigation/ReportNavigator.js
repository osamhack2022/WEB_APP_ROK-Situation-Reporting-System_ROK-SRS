import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ReceivedReportNavigator } from './ReceivedReportNavigator'
import { SentReportNavigator } from './SentReportNavigator'

const Tab = createMaterialTopTabNavigator()

export function ReportNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ReceivedReportNavigator"
        component={ReceivedReportNavigator}
        options={{ title: '받은 메모보고' }}
      />
      <Tab.Screen
        name="SentReportNavigator"
        component={SentReportNavigator}
        options={{ title: '보낸 메모보고' }}
      />
    </Tab.Navigator>
  )
}
