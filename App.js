import React, { useEffect, useState } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Tab } from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Loading from "./components/Loading";
import forgotPassword from "./components/forgotPassword";
import TermsAndConditions from "./components/TermsAndConditions";
import Privacy from "./components/Privacy";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/context";
import { setGlobal } from "reactn";
import TopStack from "./components/TopStack";
import { AppLoading } from "expo";

const Stack = createStackNavigator();

setGlobal({
  profile: {},
});

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const ref = React.useRef();

  var firebaseConfig = {
    apiKey: "AIzaSyAl50Lh2FIC2aCj34ILhI0LM4OEPVQbxjk",
    authDomain: "quickpoll-40fcd.firebaseapp.com",
    databaseURL: "https://quickpoll-40fcd.firebaseio.com",
    projectId: "quickpoll-40fcd",
    storageBucket: "quickpoll-40fcd.appspot.com",
    messagingSenderId: "253125705645",
    appId: "1:253125705645:web:9a31627601728e6e7a6b24",
    measurementId: "G-64Q01TVNPP",
  };

  if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          await AsyncStorage.setItem("token", data);
        } catch (data) {}
        dispatch({ type: "LOGIN", token: data });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("token");
        } catch (e) {}
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      setisLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {}
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <AppLoading />;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              {loginState.userToken == null ? (
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: theme["color-primary-500"],
                    },
                    headerTintColor: "#fff",
                  }}
                  initialRouteName="Login"
                >
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={Login}
                  />
                  <Stack.Screen
                    name="Forgot Password"
                    component={forgotPassword}
                  />
                  <Stack.Screen
                    name="Terms and Conditions"
                    component={TermsAndConditions}
                  />
                  <Stack.Screen name="Privacy Policy" component={Privacy} />
                  <Stack.Screen name="Loading" component={Loading} />
                </Stack.Navigator>
              ) : (
                <TopStack />
              )}
            </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider>
      </>
    );
  }
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
