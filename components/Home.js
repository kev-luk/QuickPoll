import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import {
  StyleSheet,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { default as theme } from "../theme.json";
import {
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  Modal,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { AuthContext } from "./context";

const Home = ({ navigation }) => {
  return <KeyboardAvoidingView style={styles.container}></KeyboardAvoidingView>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
