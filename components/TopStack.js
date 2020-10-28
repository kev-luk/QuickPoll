import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";
import AfterAuth from "./AfterAuth";

const Stack = createStackNavigator();

const TopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["color-primary-500"],
        },
        headerTintColor: "#fff",
      }}
      initialRouteName="AfterAuth"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="AfterAuth"
        component={AfterAuth}
      />
    </Stack.Navigator>
  );
};

export default TopStack;
