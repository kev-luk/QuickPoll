import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const CreatePost = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [title, setTitle] = useState("");

  const dbh = firebase.firestore();

  const createPost = () => {
    if (title == "") {
      Alert.alert("Please enter in a title!");
    } else if (
      (answers[0] == "") &
      (answers[1] == "") &
      (answers[2] == "") &
      (answers[3] == "")
    ) {
      Alert.alert("Please have at least one answer!");
    } else {
      dbh.collection("posts").add({
        answers: answers,
        results: [0, 0, 0, 0],
        title: title,
        author: firebase.auth().currentUser.uid
      });

      setTitle("");
      setAnswers(["", "", "", ""]);
      Alert.alert("Poll Created!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.formContainer}>
            <Text
              style={styles.createHeader}
            >
              Create Post
            </Text>
            <TextInput
              style={styles.formInput}
              autoCapitalize="words"
              placeholder="Title of your poll"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <TextInput
              style={styles.formInput}
              status="control"
              placeholder="Add an answer"
              value={answers[0]}
              onChangeText={(answerValue) => {
                const newAnswers = [...answers];
                newAnswers[0] = answerValue;
                setAnswers(newAnswers);
              }}
            />
            <TextInput
              style={styles.formInput}
              status="control"
              placeholder="Add an answer"
              value={answers[1]}
              onChangeText={(answerValue) => {
                const newAnswers = [...answers];
                newAnswers[1] = answerValue;
                setAnswers(newAnswers);
                //console.log(answers);
              }}
            />
            <TextInput
              style={styles.formInput}
              status="control"
              placeholder="Add an answer"
              value={answers[2]}
              onChangeText={(answerValue) => {
                const newAnswers = [...answers];
                newAnswers[2] = answerValue;
                setAnswers(newAnswers);
              }}
            />
            <TextInput
              style={styles.formInput}
              status="control"
              placeholder="Add an answer"
              value={answers[3]}
              onChangeText={(answerValue) => {
                const newAnswers = [...answers];
                newAnswers[3] = answerValue;
                setAnswers(newAnswers);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              createPost();
            }}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Create Poll</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme["color-primary-500"],
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  formInput: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BBBBBB",
  },
  createButton: {
    marginVertical: 15,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#14A085",
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  icon: {
    textAlign: "center",
    color: "#06ba00",
    marginTop: 10,
  },
  createHeader: {
    fontSize: 30,
    fontWeight: "900",
    marginVertical: 15,
    textAlign: "center"
  }
});
