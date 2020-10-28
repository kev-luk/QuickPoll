import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Constants from "expo-constants";

const Loading = () => {
  return <View style={styles.backgroundContainer}></View>;
};

export default Loading;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fe2c54",
  },
});
