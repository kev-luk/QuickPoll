import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { Button, StyleService } from "@ui-kitten/components";
import * as firebase from "firebase";
import "firebase/firestore";

const Home = ({ navigation }) => {
  const dbh = firebase.firestore();
  const [posts, setPosts] = useState([]);
  const [ids, setIds] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dbh
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        setIds(querySnapshot.docs.map((doc) => doc.id));
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const updateVote = (index, curPost) => {
    const ref = dbh.collection("posts").doc(ids[curPost]);

    let results = [...posts[curPost].results];
    results[index] = results[index] + 1;

    ref.update({
      results: results,
    });

    let newPosts = posts;
    newPosts[curPost].results = results;
    setPosts(newPosts);
  };

  const renderList = (item, curPost) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>{item.title}</Text>
        <Button
          onPress={() => {
            updateVote(0, curPost);
          }}
          style={styles.answerBox}
        >
          {item.answers[0]}
        </Button>
        <Button
          onPress={() => {
            updateVote(1, curPost);
          }}
          style={styles.answerBox}
        >
          {item.answers[1]}
        </Button>
        <Button
          onPress={() => {
            updateVote(2, curPost);
          }}
          style={styles.answerBox}
        >
          {item.answers[2]}
        </Button>
        <Button
          onPress={() => {
            updateVote(3, curPost);
          }}
          style={styles.answerBox}
        >
          {item.answers[3]}
        </Button>
      </View>
    );
  };

  if (loading) {
    return <View></View>;
  } else {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={({ item, index }) => {
            return renderList(item, index);
          }}
        />
      </View>
    );
  }
};

export default Home;

const styles = StyleService.create({
  contentContainer: {
    flex: 1,
    //backgroundColor: "background-basic-color-2",
  },
  questionContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
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
