import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AnswerList = (props) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listItem}>{props.text}</Text>
    </View>
  );
};

export default AnswerList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: "5%",
    flexDirection: "row",
    borderColor: "#aaaaaa",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "stretch",
    minHeight: 40,
    justifyContent: "space-between",
  },
  listItem: {
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 6,
    borderBottomWidth: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
