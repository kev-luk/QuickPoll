import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  Text,
  AsyncStorage,
} from "react-native";
import { Button, Icon, Input } from "@ui-kitten/components";
import { default as theme } from "../theme.json";
import { AuthContext } from "./context";
import Constants from "expo-constants";
import * as Facebook from "expo-facebook";
import { useGlobal } from "reactn";
import "firebase/firestore";

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const [global, setGlobal] = useGlobal();

  const dbh = firebase.firestore();

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

  const saveAuth = async (token, credential) => {
    signIn(token);
  };

  async function loginWithFacebook() {
    await Facebook.initializeAsync("381289249733338");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          // Handle Errors here.
        });


      let userRef = dbh.collection('users').doc(firebase.auth().currentUser.uid);
      let user = await userRef.get();

      if (!user.exists) {
        dbh.collection("users").doc(firebase.auth().currentUser.uid).set({
          name: "",
          location: "",
          bio: ""
        })
      }

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setGlobal({
            profile: firebase.auth().currentUser,
          });
          saveAuth(token, credential);
        } else {
          // No user is signed in.
        }
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Text
          style={{
            fontSize: 70,
            color: theme["color-primary-500"],
            alignSelf: "center",
          }}
        >
          QuickPoll
        </Text>
        <Image
          style={{ width: 275, height: 275, alignSelf: "center" }}
          source={require("../assets/poll.png")}
        />
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={() => {
            loginWithFacebook();
          }}
        >
          SIGN IN WITH FACEBOOK
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
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
