import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Text, Button, Icon, Input } from "@ui-kitten/components";
import { default as theme } from "../theme.json";
import { AuthContext } from "./context";
import Constants from "expo-constants";

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const errorIcon = (props) => <Icon name="alert-circle" {...props} />;

  const personOutline = (props) => <Icon name="person" {...props} />;

  //const googleIcon = (props) => <Icon name="facebook" {...props} />;

  //const facebookIcon = (props) => <Icon name="google" {...props} />;

  //const twitterIcon = (props) => <Icon name="twitter" {...props} />;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorPresent, setErrorPresent] = useState(false);

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate("Forgot Password");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const eyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={!passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const sendInfo = async () => {
    setErrorPresent(false);
    fetch("http://cometshare.com/api/users/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.success == true) {
          signIn(data);
        } else {
          setErrorPresent(true);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text
              style={{ fontStyle: "italic", fontSize: 45 }}
              category="h1"
              status="control"
            >
              QuickPoll
            </Text>
            <Text style={styles.signInLabel} category="s1" status="control">
              Please Sign in
            </Text>
          </View>
          <View style={styles.formContainer}>
            {errorPresent ? (
              <Button accessoryLeft={errorIcon} style={styles.errorMessage}>
                Username or Password is Incorrect
              </Button>
            ) : null}

            <Input
              textStyle={{ color: "black" }}
              placeholder="Username"
              accessoryLeft={personOutline}
              value={username}
              onChangeText={setUsername}
              style={{ backgroundColor: "white" }}
            />
            <Input
              textStyle={{ color: "black" }}
              style={styles.passwordInput}
              placeholder="Password"
              accessoryLeft={eyeIcon}
              value={password}
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
            />

            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="control"
                onPress={onForgotPasswordButtonPress}
              >
                Forgot your password?
              </Button>
            </View>
          </View>
          <Button
            style={styles.signInButton}
            size="giant"
            onPress={() => {
              sendInfo();
            }}
            appearance="ghost"
          >
            SIGN IN
          </Button>
          {/*
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryLeft={googleIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryLeft={facebookIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryLeft={twitterIcon}
            />
          </View>
        </View> */}

          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            onPress={() => navigation && navigation.navigate("Signup")}
          >
            Don't have an account? Sign Up
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["color-primary-500"],
  },
  errorMessage: {
    color: "white",
    marginBottom: 5,
  },
  headerContainer: {
    marginTop: statusBarHeight + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginVertical: "5%",
  },
  passwordInput: {
    marginTop: 16,
    backgroundColor: "white",
  },
  signInButton: {
    marginHorizontal: 16,
    backgroundColor: "white",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
});
