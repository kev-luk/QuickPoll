import React, { useState } from "react";
//import { TermsAndConditions } from "./TermsAndConditions"
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Button,
  CheckBox,
  Input,
  Text,
  Icon,
  Modal,
} from "@ui-kitten/components";

import { default as theme } from "../theme.json";
//import TermsAndConditions from "./TermsAndConditions";

const statusBarHeight = Constants.statusBarHeight;

const Signup = ({ navigation }) => {
  var currentDate = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  //const [birthDate, setBirthDate] = useState(new Date());
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const [sentEmail, setSentEmail] = useState(false);

  const errorIcon = (props) => <Icon name="alert-circle" {...props} />;

  const [date, setDate] = useState(new Date(year - 16, month - 1, currentDate));
  const [show, setShow] = useState(false);

  const [pickingDate, setPickingDate] = useState(false);

  const personOutline = (props) => <Icon name="person" {...props} />;

  const doneIcon = (props) => <Icon name="checkmark-outline" {...props} />;

  const EmailIcon = (props) => <Icon {...props} name="email" />;

  const eyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const goToLogin = () => {
    navigation && navigation.navigate("Login");
  };

  const goToTermsAndConditions = () => {
    navigation && navigation.navigate("Terms and Conditions");
  };

  const goToPrivacyPolicy = () => {
    navigation && navigation.navigate("Privacy Policy");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const sendInfo = async (navigation) => {
    setEmailError(false);
    setUserError(false);
    setValidEmail(false);

    if (!termsAccepted) {
      return;
    }
    fetch("http://cometshare.com/api/users/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        dateOfBirth: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message ==
          "Username is already taken and Email AND Password are invalid."
        ) {
          ////console.log(data.message);
          setValidEmail(true);
          setUserError(true);
          setInvalidPassword(true);
        } else if (
          data.message ==
          "Username and Email are already taken and Password is invalid."
        ) {
          ////console.log(data.message);
          setUserError(true);
          setEmailError(true);
          setInvalidPassword(true);
        } else if (
          data.message == "Username is taken and Password is invalid."
        ) {
          ////console.log(data.message);
          setUserError(true);
          setInvalidPassword(true);
        } else if (
          data.message == "Email is already taken and Password is invalid"
        ) {
          ////console.log(data.message);
          setEmailError(true);
          setInvalidPassword(true);
        }

        if (data.message == "Email and Password are invalid") {
          ////console.log(data.message);
          setValidEmail(true);
          setInvalidPassword(true);
        } else if (
          data.message == "Username is already taken and Email is not valid."
        ) {
          ////console.log(data.message);
          setValidEmail(true);
          setUserError(true);
        } else if (data.message == "Email is not valid.") {
          ////console.log(data.message);
          setValidEmail(true);
        } else if (data.message == `Username and Email are already taken.`) {
          ////console.log(data.message);
          setEmailError(true);
          setUserError(true);
        } else if (data.message == `Email is already registered.`) {
          ////console.log(data.message);
          setEmailError(true);
        } else if (data.message == `Username is already taken.`) {
          ////console.log(data.message);
          setUserError(true);
        } else if (data.message == `Password is invalid.`) {
          setInvalidPassword(true);
          ////console.log(data.message);
        } else if (
          data.message == `You have successfully registred! Please login.`
        ) {
          ////console.log("Success:", data.message);
          setSentEmail(true);
          //onSignUpButtonPress();
        } else if (data.message == "One or more of the fields are missing!") {
          setFieldError(true);
          ////console.log(data.message);
        } else if (data.message == "Email has been sent!") {
          setSentEmail(true);
          ////console.log(data.message);
        } else {
          ////console.log(data);
        }
      })
      .catch((error) => {
        console.error(data);
      });
  };

  const pressHandler = () => {
    sendInfo();
    //goToLogin();
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS != "ios") {
      setPickingDate(false);
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const toggleSetDate = () => {
    setPickingDate(!pickingDate);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSetDate}>
      <Icon {...props} name="calendar" />
    </TouchableWithoutFeedback>
  );

  //////console.log(date);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text
              style={(styles.signInLabel, { fontSize: 18 })}
              category="s1"
              status="control"
            >
              Please create your account.
            </Text>
          </View>
          <View style={styles.formContainer}>
            {fieldError ? (
              <Button accessoryLeft={errorIcon} style={styles.errorMessage}>
                One or more of the fields are missing!
              </Button>
            ) : null}
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="words"
              placeholder="First Name"
              value={firstName}
              onChangeText={setfirstName}
              accessoryLeft={personOutline}
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="words"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setlastName}
              accessoryLeft={personOutline}
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="none"
              placeholder="Username"
              accessoryLeft={personOutline}
              value={username}
              onChangeText={setUsername}
              caption={`${userError ? "Username is already registered!" : ""}`}
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="none"
              placeholder="Email"
              accessoryLeft={EmailIcon}
              value={email}
              onChangeText={setEmail}
              caption={`${
                validEmail
                  ? "Email is not valid!"
                  : emailError
                  ? "Email is already taken"
                  : ""
              }`}
            />
            <Input
              style={styles.formInput}
              placeholder="Password"
              accessoryLeft={eyeIcon}
              value={password}
              secureTextEntry={passwordVisible}
              onChangeText={setPassword}
              status="control"
              caption={`${
                invalidPassword
                  ? "Password does not meet criteria (Must have at least 1 lowercase, uppercase, numeric, and special character. Must also be at least 8 characters.)"
                  : "Must have at least 1 lowercase, uppercase, numeric, and special character. Must also be at least 8 characters."
              }`}
            />

            {/* <Text style={{paddingTop:20, color: 'white', alignSelf: 'center'}}>
            Please select your Date of Birth below</Text> */}

            <Input
              style={styles.formInput}
              disabled={true}
              status="control"
              autoCapitalize="none"
              placeholder="Birthdate"
              accessoryRight={renderIcon}
              value={date.toDateString()}
              onChangeText={setDate}
              label="Birthday"
              caption="If you are under 18 years old, you must get consent from your legal guardian"
            />

            {pickingDate ? (
              <DateTimePicker
                style={{ flex: 2 }}
                textColor="white"
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="calendar"
                onChange={onChange}
                maximumDate={new Date(year - 16, month - 1, currentDate)}
              />
            ) : null}

            <View style={{ flex: 3, flexDirection: "row", marginTop: "6%" }}>
              <CheckBox
                style={styles.termsCheckBox}
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <Text style={{ color: "white" }}>
                I read and agree to the{" "}
                <Text style={styles.links} onPress={goToTermsAndConditions}>
                  Terms and Conditions
                </Text>{" "}
                and the{" "}
                <Text style={styles.links} onPress={goToPrivacyPolicy}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
          <Button
            style={styles.signUpButton}
            size="giant"
            onPress={pressHandler}
          >
            SIGN UP
          </Button>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="control"
            onPress={goToLogin}
          >
            Already have account? Sign In
          </Button>

          <Modal
            backdropStyle={styles.backdrop}
            style={styles.modalView}
            visible={sentEmail}
          >
            <View>
              <Text style={styles.modalMessageText}>
                Account has been created!
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginHorizontal: "5%",
                  paddingTop: "2%",
                }}
                status="primary"
                category="s1"
              >
                Please check your email for an activation link to activate
                account and get started!
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginHorizontal: "10%",
                  paddingTop: "5%",
                }}
                status="primary"
                category="s1"
              >
                Click the button below to Login!
              </Text>
            </View>
            <Button
              style={styles.modalExitButton}
              appearance="filled"
              accessoryLeft={doneIcon}
              onPress={() => {
                setSentEmail(false);
                goToLogin();
              }}
              status="primary"
            >
              Got it!
            </Button>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["color-primary-500"],
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: statusBarHeight,
    //minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: "center",
    backgroundColor: theme["color-info-500"],
    //tintColor: "text-hint-color",
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    //alignItems: 'center'
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    //position: 'absolute',
    paddingRight: 8,
    marginTop: 0,
  },
  termsCheckBoxText: {
    color: "white",
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
  links: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: "white",
    marginBottom: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalExitButton: {
    width: "40%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  modalMessageText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalView: {
    position: "absolute",
    //bottom: 2,
    width: "90%",
    height: "30%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 7,
    //borderColor: theme["color-primary-500"],
    //borderWidth: 2,
  },
});
