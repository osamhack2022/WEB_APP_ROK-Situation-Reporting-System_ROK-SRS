import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ReceivedReportScreen } from '../screens/bottom-tab-screens/ReceivedReportScreen'
import { SentReportScreen } from '../screens/bottom-tab-screens/SentReportScreen'

const Tab = createMaterialTopTabNavigator()

export function ReportNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ReceivedReportScreen"
        component={ReceivedReportScreen}
        options={{ title: '받은 메모보고' }}
      />
      <Tab.Screen
        name="SentReportScreen"
        component={SentReportScreen}
        options={{ title: '보낸 메모보고' }}
      />
    </Tab.Navigator>
  )
}
