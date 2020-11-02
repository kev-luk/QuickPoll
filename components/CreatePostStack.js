import React from "react";
import CreatePost from "./CreatePost";
import { createStackNavigator } from "@react-navigation/stack";
import { default as theme } from "../theme.json";

const Stack = createStackNavigator();

const CreatePostStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Post"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme["color-primary-500"],
                },
                headerTintColor: "#fff",
            }}
        >
            <Stack.Screen name="Post" component={CreatePost} />
        </Stack.Navigator>
    );
};

export default CreatePostStack;