import React from "react";
import Settings from "./Settings";
import Privacy from "./Privacy";
import EditProfile from "./EditProfile";
import TermsAndConditions from "./TermsAndConditions";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";
import PollChart from "./PollChart"

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["color-primary-500"],
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Terms And Conditions"
        component={TermsAndConditions}
      />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Edit Profile" component={PollChart} />
    </Stack.Navigator>
  );
};

export default HomeStack;
