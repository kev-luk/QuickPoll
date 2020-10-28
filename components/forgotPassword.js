import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import {
  Button,
  Input,
  Text,
  Modal,
  Icon,
  Layout,
} from "@ui-kitten/components";

const forgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const goToLogin = () => {
    navigation && navigation.navigate("Login");
  };

  const EmailIcon = (props) => <Icon {...props} name="email" />;

  const doneIcon = (props) => <Icon name="checkmark-outline" {...props} />;

  const sendEmail = async (navigation) => {
    setEmailError(false);
    fetch("http://cometshare.com/api/users/forgot-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.error == "User with this email does not exist.") {
          ////console.log(data.error);
          setEmailError(true);
        } else if (data.error == "reset password link error") {
          ////console.log(data.error);
        } else {
          setSentEmail(true);
          ////console.log(data.message);
        }
      });
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.enterEmailLabel} status="control">
          Please enter your email address
        </Text>
        <View style={styles.formContainer}>
          <Input
            status="primary"
            placeholder="Email"
            icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
            caption={`${
              emailError ? "There is no account registered to this Email." : ""
            }`}
          />
        </View>
        <Button style={styles.signInButton} onPress={sendEmail}>
          RESET PASSWORD
        </Button>
        <Button
          style={styles.signInButton}
          //appearance="filled"
          status="basic"
          onPress={goToLogin}
        >
          Go Back
        </Button>

        <Modal style={styles.modalView} visible={sentEmail}>
          <Text style={styles.modalMessageText}>Email sent!</Text>
          <Text
            style={{
              alignSelf: "center",
              marginHorizontal: "5%",
              paddingTop: "2%",
            }}
            status="primary"
            category="s1"
          >
            Your reset password link has been emailed to you.
          </Text>
          <Button
            style={styles.modalExitButton}
            accessoryLeft={doneIcon}
            onPress={() => {
              setSentEmail(false);
              navigation.navigate("Login");
            }}
            status="primary"
          >
            Done
          </Button>
        </Modal>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
    alignItems: "center",
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 24,
    color: "#FE2C54",
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 64,
    color: "#FE2C54",
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 0.75,
  },
  modalView: {
    position: "absolute",
    //bottom: 2,
    width: "90%",
    height: "22%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 7,
    borderColor: "black",
    borderWidth: 2,
  },
  modalMessageText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalExitButton: {
    width: "40%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  errorMessage: {
    position: "absolute",
    bottom: 380,
    color: "red",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
