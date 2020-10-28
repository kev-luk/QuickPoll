import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { Text, Spinner, Layout } from "@ui-kitten/components";

const MyEndorsements = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Layout level="2" style={styles.container}>
          <View style={styles.body}></View>
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
    justifyContent: "center",
    //flexDirection: "column-reverse",
  },
});
