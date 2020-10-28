import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import EndorsementStack from "./EndorsementStack";
import theme from "../theme.json";
import SettingsStack from "./SettingsStack";
const Tabs = createBottomTabNavigator();

const AfterAuth = () => {
  const myIconHome = (focused, props) => (
    <Ionicons
      {...props}
      name="ios-home"
      size={30}
      color={focused ? theme["color-primary-500"] : "black"}
    />
  );

  const myIcon = (focused, props) => (
    <Ionicons
      {...props}
      name="ios-list"
      size={30}
      color={focused ? theme["color-primary-500"] : "black"}
    />
  );

  const myIconProfile = (focused, props) => (
    <Ionicons
      {...props}
      name="md-person"
      size={30}
      color={focused ? theme["color-primary-500"] : "black"}
    />
  );

  const myIconSettings = (focused, props) => (
    <Ionicons
      {...props}
      name="ios-settings"
      size={30}
      color={focused ? theme["color-primary-500"] : "black"}
    />
  );

  return (
    <Tabs.Navigator initialRouteName="HomeStack">
      <Tabs.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => myIconProfile(focused),
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => myIconHome(focused),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tabs.Screen
        options={{
          title: "Endorsements",
          tabBarIcon: ({ focused }) => myIcon(focused),
        }}
        name="EndorsementsStack"
        component={EndorsementStack}
      />
      <Tabs.Screen
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => myIconSettings(focused),
        }}
        name="SettingsStack"
        component={SettingsStack}
      />
    </Tabs.Navigator>
  );
};

export default AfterAuth;
