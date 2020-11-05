import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, FlatList } from "react-native";
import { Button, Text, StyleService } from "@ui-kitten/components";

const Home = ({ navigation }) => {
  const postList = [
    {
      question: "What is your favorite dessert?",
      image: "placeholder",
      answers: ["Ice cream", "Cake", "Brownies", "Cookies"],
      id: "1",
    },
    {
      question: "What is your favorite music genre?",
      image: "placeholder",
      answers: ["Rap", "Classical", "Country", "Jazz"],
      id: "2",
    },
    {
      question: "What is your favorite music genre?",
      image: "placeholder",
      answers: ["Rap", "Classical", "Country", "Jazz"],
      id: "3",
    },
    {
      question: "What is your favorite music genre?",
      image: "placeholder",
      answers: ["Rap", "Classical", "Country", "Jazz"],
      id: "4",
    },
  ];

  return (
    <View style={styles.contentContainer}>
      <FlatList
        // snapToAlignment={'top'}
        // pagingEnabled={true}
        // decelerationRate={'fast'}
        keyExtractor={(item) => item.id}
        data={postList}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionHeader}>{item.question}</Text>
            <Button style={styles.answerBox}>{item.answers[0]}</Button>
            <Button style={styles.answerBox}>{item.answers[1]}</Button>
            <Button style={styles.answerBox}>{item.answers[2]}</Button>
            <Button style={styles.answerBox}>{item.answers[3]}</Button>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleService.create({
  contentContainer: {
    // flex: 1,
    //backgroundColor: "background-basic-color-2",
  },
  questionContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    // backgroundColor: 'red',
    // borderWidth: 10,
    // borderColor: 'blue'
  },
  questionHeader: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 10,
  },
  answerBox: {
    textAlign: "left",
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "40%",
    marginBottom: 20,
    backgroundColor: "red",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
