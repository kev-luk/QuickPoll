import React from "react";
import MyEndorsements from "./MyEndorsements";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Endorsements"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["color-primary-500"],
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="My Endorsements" component={MyEndorsements} />
    </Stack.Navigator>
  );
};

export default HomeStack;
