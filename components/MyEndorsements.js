import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput
} from "react-native";
import {
  Text,
  Spinner,
  Layout,
  Button
} from "@ui-kitten/components";

const MyEndorsements = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Layout level="3" style={styles.container}>
          <View style={styles.body}>
            <TextInput
              style={styles.formInput}
              placeholder="Search for a poll" />
            <ScrollView style={styles.scroll}>
              <Button style={styles.button}>Poll 1</Button>
              <Button style={styles.button}>Poll 2</Button>
              <Button style={styles.button}>Poll 3</Button>
              <Button style={styles.button}>Poll 4</Button>
            </ScrollView>
          </View>
        </Layout>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MyEndorsements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "white",
  },
  title: {
    flex: 0.1,
    alignItems: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    //flexDirection: "column-reverse",
  },
  formInput: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    width: "95%"
  },
  scroll: {
    width: '95%'
  },
  button: {
    marginBottom: 10
  }
});
