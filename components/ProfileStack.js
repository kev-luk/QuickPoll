import React from "react";
import Profile from "./Profile";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["color-primary-500"],
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
