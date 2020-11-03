import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import {
  Text,
  Input,
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
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="words"
              placeholder="Search for a poll" />
            <ScrollView style={styles.scroll}>
              <Button>Press</Button>
              <Button>Press</Button>
              <Button>Press</Button>
              <Button>Press</Button>
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
    marginTop: 5,
    marginBottom: 10,
    color: 'black',
    borderRadius: 10,
    width: '95%',
    backgroundColor: '#DDDDDD',
  },
  scroll: {
    width: '95%'
  }
});
