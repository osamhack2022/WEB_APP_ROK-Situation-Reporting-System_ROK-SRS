import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ReportNavigator } from '../navigation/ReportNavigator'
import {
  ChatListScreen,
  OrgChartScreen,
  NotificationScreen,
  SettingScreen,
} from '../screens/bottom-tab-screens'

const Tab = createBottomTabNavigator()

const icons = {
  ReportNavigator: ['note-text', 'note-text-outline'],
  ChatListScreen: ['message-text', 'message-text-outline'],
  OrgChartScreen: ['graph', 'graph-outline'],
  NotificationScreen: ['bell', 'bell-outline'],
  SettingScreen: ['cog', 'cog-outline'],
}

const getActiveRouteName = (route) => {
  if (route.state) {
    return getActiveRouteName(route.state.routes[route.state.index])
  }

  return route.name
}

const screenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      const { name } = route
      const focusedSize = focused ? size + 6 : size
      const focusedColor = focused ? Colors.white : Colors.grey400
      const [icon, iconOutline] = icons[name]
      const iconName = focused ? icon : iconOutline
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />
    },
    tabBarShowLabel: true,
    tabBarStyle: { height: 55, paddingBottom: 5, backgroundColor: '#008272' },
    headerTitleAlign: 'center',
    tabBarLabelStyle: { color: Colors.grey200 },
  }
}

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="ReportNavigator"
        options={{ title: '메모보고' }}
        component={ReportNavigator}
      />
      <Tab.Screen
        name="ChatListScreen"
        options={{
          title: '채팅',
        }}
        component={ChatListScreen}
      />
      <Tab.Screen
        name="OrgChartScreen"
        options={{ title: '조직도' }}
        component={OrgChartScreen}
      />
      <Tab.Screen
        name="NotificationScreen"
        options={{ title: '알림' }}
        component={NotificationScreen}
      />
      <Tab.Screen
        name="SettingScreen"
        options={{ title: '설정' }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  )
}
