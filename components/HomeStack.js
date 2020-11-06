import React from "react";
import Home from "./Home";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";
import PollChart from './PollChart'

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["color-primary-500"],
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ headerShown: true }}
        component={Home}
      />
      <Stack.Screen
        name="Poll Chart"
        component={PollChart}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
