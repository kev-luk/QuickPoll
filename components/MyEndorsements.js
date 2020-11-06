import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { Text, Spinner, Layout, Button } from "@ui-kitten/components";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLabel,
} from "victory-native";
import { default as theme } from "../theme.json";

const MyEndorsements = () => {
  const dbh = firebase.firestore();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [ids, setIds] = useState([]);
  const [voted, setVoted] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, settitle] = useState("");
  const uid = firebase.auth().currentUser.uid;

  const [poll, setPoll] = useState({});

  const contains = (item, query) => {
    if (item.title.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    const searchData = posts.filter((item) => {
      return contains(item, formatQuery);
    });
    setQuery(formatQuery);
    setFilteredPosts(searchData);
  };

  const [loading, setLoading] = useState(true);

  const changePoll = (item) => {
    const data = {
      pollResults: [
        { x: item.answers[0], y: item.results[0] },
        { x: item.answers[1], y: item.results[1] },
        { x: item.answers[2], y: item.results[2] },
        { x: item.answers[3], y: item.results[3] },
      ],
    };

    setPoll(data);
  };

  const renderList = (item, curPost) => {
    return (
      <Button
        onPress={() => {
          changePoll(item);
          settitle(item.title);
          setModalVisible(true);
        }}
        style={styles.button}
      >
        {item.title}
      </Button>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dbh
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        setIds(querySnapshot.docs.map((doc) => doc.id));
        const recievedPosts = querySnapshot.docs.map((doc) => doc.data());
        setPosts(recievedPosts);
        setFilteredPosts(recievedPosts);
        setVoted(
          querySnapshot.docs.map((doc) => {
            return doc.data().usersVoted.includes(uid) ? true : false;
          })
        );
      });
  }, []);

  if (loading) {
    return <View></View>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <Layout level="3" style={styles.container}>
            <View style={styles.body}>
              <TextInput
                style={styles.formInput}
                placeholder="Search for a poll"
                value={query}
                onChangeText={handleSearch}
              />
              <FlatList
                extraData={refresh}
                keyExtractor={(item) => item.id}
                data={filteredPosts}
                renderItem={({ item, index }) => {
                  return renderList(item, index);
                }}
              />
            </View>
          </Layout>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => {
              setModalVisible(false);
            }}
            transparent={true}
          >
            <View style={styles.tab}>
              <Text style={styles.questionHeader}>{title}</Text>
              <VictoryChart domainPadding={{ x: 25 }}>
                <VictoryGroup>
                  <VictoryBar
                    data={poll.pollResults}
                    style={{
                      data: {
                        fill: theme["color-primary-500"],
                      },
                    }}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 500 },
                    }}
                  />
                </VictoryGroup>
              </VictoryChart>
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{ width: "75%", alignSelf: "center" }}
              >
                Close
              </Button>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
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
  questionHeader: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 10,
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
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    width: "95%",
  },
  tab: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "space-evenly",
    height: "70%",
    width: "100%",
    backgroundColor: "white",
    marginVertical: "25%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme["color-primary-transparent-500"],
  },
  scroll: {
    width: "95%",
  },
  button: {
    marginBottom: 10,
    width: "95%",
  },
});
