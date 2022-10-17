import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RecdReportNavigator } from './RecdReportNavigator'
import { SentReportNavigator } from './SentReportNavigator'
import { Colors } from 'react-native-paper'

const Tab = createMaterialTopTabNavigator()

export function ReportNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{ indicatorStyle: { backgroundColor: Colors.green800 } }}
    >
      <Tab.Screen
        name="RecdReportNavigator"
        component={RecdReportNavigator}
        options={{
          title: '받은 메모보고',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '600' },
        }}
      />
      <Tab.Screen
        name="SentReportNavigator"
        component={SentReportNavigator}
        options={{
          title: '보낸 메모보고',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '600' },
        }}
      />
    </Tab.Navigator>
  )
}
