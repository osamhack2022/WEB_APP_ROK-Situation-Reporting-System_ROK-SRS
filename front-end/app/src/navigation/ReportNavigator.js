import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { Colors } from 'react-native-paper'
import { RecdReportScreen, SentReportScreen } from '../screens'

const Tab = createMaterialTopTabNavigator()

export function ReportNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{ indicatorStyle: { backgroundColor: Colors.green800 } }}
    >
      <Tab.Screen
        name="RecdReportScreen"
        component={RecdReportScreen}
        options={{
          title: '받은 메모보고',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '600' },
        }}
      />
      <Tab.Screen
        name="SentReportScreen"
        component={SentReportScreen}
        options={{
          title: '보낸 메모보고',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '600' },
        }}
      />
    </Tab.Navigator>
  )
}
