import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import {
  StyleSheet,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";
import { default as theme } from "../theme.json";
import {
  Button,
  Text,
  Divider,
  Modal,
  StyleService,
  Icon,
  Layout,
  Spinner,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { AuthContext } from "./context";
import { TextStyleProps } from "@ui-kitten/components/devsupport";
import { ScrollView } from "react-native-gesture-handler";
import { round } from "react-native-reanimated";

const Home = ({ navigation }) => {

  const postList = [
    {
      question: 'What is your favorite dessert?',
      image: 'placeholder',
      answers: [
        'Ice cream',
        'Cake',
        'Brownies',
        'Cookies'
      ]
    },
    {
      question: 'What is your favorite music genre?',
      image: 'placeholder',
      answers: [
        'Rap',
        'Classical',
        'Country',
        'Jazz'
      ]
    },
  ]

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionHeader}>{postList[0].question}</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'http://placekitten.com/g/300/200',
          }}
        />
      </View>
      <View>
        <Button style={styles.answerBox}>{postList[0].answers[0]}</Button>
        <Button style={styles.answerBox}>{postList[0].answers[1]}</Button>
        <Button style={styles.answerBox}>{postList[0].answers[2]}</Button>
        <Button style={styles.answerBox}>{postList[0].answers[3]}</Button>
      </View>
    </View>
  )
};

export default Home;

const styles = StyleService.create({
  contentContainer: {
    flex: 1,
    //backgroundColor: "background-basic-color-2",
  },
  questionContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  questionHeader: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 10
  },
  answerBox: {
    textAlign: 'left',
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
    marginBottom: 20,
    backgroundColor: 'red'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

