import React from "react";
import Home from "./Home";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";

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
        options={{ headerShown: false }}
        component={Home}
      />
      {/* <Stack.Screen name="Create Endorsement" component={CreateEndorsement} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
