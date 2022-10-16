import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ReportNavigator } from "./ReportNavigator";
import { SettingNavigator } from "./SettingNavigator";
import { ChatListScreen, OrgChartScreen } from "../screens";

const Tab = createBottomTabNavigator();

const icons = {
  ReportNavigator: ["note-text", "note-text-outline"],
  ChatListScreen: ["message-text", "message-text-outline"],
  OrgChartScreen: ["graph", "graph-outline"],
  SettingNavigator: ["cog", "cog-outline"],
};

const getActiveRouteName = (route) => {
  if (route.state) {
    return getActiveRouteName(route.state.routes[route.state.index]);
  }

  return route.name;
};

const screenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused, size }) => {
      const { name } = route;
      const focusedSize = focused ? size + 6 : size;
      const focusedColor = focused ? Colors.white : Colors.grey400;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
    tabBarShowLabel: true,
    headerTitleAlign: "center",
    tabBarStyle: { height: 55, paddingBottom: 5, backgroundColor: "#008272" },
    tabBarLabelStyle: { color: Colors.grey200 },
  };
};

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="ReportNavigator"
        options={{ tabBarLabel: "메모보고", headerShown: false }}
        component={ReportNavigator}
      />
      <Tab.Screen
        name="ChatListScreen"
        options={{
          title: "채팅",
          headerTitle: "채 팅",
        }}
        component={ChatListScreen}
      />
      <Tab.Screen
        name="OrgChartScreen"
        options={{ title: "조직도", headerTitle: "조 직 도" }}
        component={OrgChartScreen}
      />
      <Tab.Screen
        name="SettingNavigator"
        options={{ title: "설정", headerShown: false }}
        component={SettingNavigator}
      />
    </Tab.Navigator>
  );
}
