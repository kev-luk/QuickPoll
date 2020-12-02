import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  AsyncStorage,
  LogBox
} from "react-native";
import { Button, StyleService, Layout, Spinner } from "@ui-kitten/components";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLabel,
} from "victory-native";
import { default as theme } from "../theme.json";
import { useGlobal } from "reactn";

console.disableYellowBox = true;

const Home = ({ navigation }) => {
  const dbh = firebase.firestore();
  const [posts, setPosts] = useState([]);
  const [ids, setIds] = useState([]);
  const [voted, setVoted] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(true);
  const [profileState, setProfileState] = useGlobal("profile");

  function onReload() {
    setReload(true);
    getData();
  }

  const getData = () => {
    dbh
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        setIds(querySnapshot.docs.map((doc) => doc.id));
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
        setVoted(
          querySnapshot.docs.map((doc) => {
            return doc.data().usersVoted.includes(profileState.uid)
              ? true
              : false;
          })
        );
      });
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const updateVote = (index, curPost) => {
    const ref = dbh.collection("posts").doc(ids[curPost]);

    let results = [...posts[curPost].results];
    results[index] = results[index] + 1;

    ref.update({
      results: results,
      usersVoted: firebase.firestore.FieldValue.arrayUnion(profileState.uid),
    });

    let newPosts = posts;
    newPosts[curPost].results = results;
    setPosts(newPosts);

    let newVoted = voted;
    newVoted[curPost] = true;
    setVoted(newVoted);

    setRefresh(!refresh);
  };

  const renderList = (item, curPost) => {
    const data = {
      pollResults: [
        { x: item.answers[0], y: item.results[0] },
        { x: item.answers[1], y: item.results[1] },
        { x: item.answers[2], y: item.results[2] },
        { x: item.answers[3], y: item.results[3] },
      ],
    };
    if (voted[curPost]) {
      return (
        <View>
          <Text style={styles.questionHeader}>{item.title}</Text>
          <VictoryChart domainPadding={{ x: 25 }}>
            <VictoryGroup>
              <VictoryBar
                data={data.pollResults}
                style={{
                  data: {
                    fill: '#0084ff',
                  },
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 500 },
                }}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>
      );
    } else {
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
    }
  };

  if (loading) {
    return (
      <Layout style={styles.body} level="1">
        <Spinner />
      </Layout>
    )
  } else {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          extraData={refresh}
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={({ item, index }) => {
            return renderList(item, index);
          }}
          refreshing={reload}
          onRefresh={() => onReload()}
        />
      </View>
    );
  }
};

export default Home;

const styles = StyleService.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
