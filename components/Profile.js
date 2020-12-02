import React, { useEffect, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
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
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLabel,
} from "victory-native";
import * as firebase from "firebase";
import { AuthContext } from "./context";
import { TextStyleProps } from "@ui-kitten/components/devsupport";
import { useGlobal } from "reactn";
import "firebase/firestore";
import { default as theme } from "../theme.json";

const ProfileSettings = ({ navigation }) => {
  const dbh = firebase.firestore();

  const { signOut } = React.useContext(AuthContext);

  const [profileState, setProfileState] = useGlobal("profile");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [poll, setPoll] = useState({});
  const [title, settitle] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    recieveUser().then(() => setRefreshing(false));
  }, []);

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

  const deletePoll = () => {

  }

  // get polls that have same uuid
  const getData = () => {
    dbh.collection("posts").where("author", "==", firebase.auth().currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const recievedPosts = querySnapshot.docs.map((doc) => doc.data());
          console.log(recievedPosts)
          setPosts(recievedPosts);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  const renderList = (item, curPost) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changePoll(item);
          settitle(item.title);
          setModalVisible(true);
        }}
        style={styles.pollButton}
      >
        <Text
          style={styles.pollButtonText}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("signed out");
      })
      .catch(function (error) {
        console.log("error signing out");
      });
    signOut();
  };

  useEffect(() => {
    setTimeout(() => {
      getData()
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Layout style={styles.body} level="1">
        <Spinner />
      </Layout>
    );
  } else {
    return (
      <Layout style={styles.contentContainer} level="1">
        <ScrollView
          //contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Layout style={styles.header} level="1">
            <View style={styles.profileContainer}>
              <View style={styles.profileDetailsContainer}>
                <Text category="h2" style={styles.profileUserName}>
                  {profileState.displayName}
                </Text>
                <View style={styles.profileLocationContainer}>
                  <View style={styles.profileInformation}>
                    <Text
                      style={styles.profileLocation}
                      appearance="hint"
                      category="s1"
                    >
                      {profileState.displayName}
                    </Text>
                    <Text
                      style={styles.pollsHeader}
                    >
                      My Polls
                    </Text>
                    <FlatList
                      keyExtractor={(item) => item.id}
                      data={posts}
                      renderItem={({ item, index }) => {
                        return renderList(item, index);
                      }}
                    />
                  </View>
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
                        status="danger"
                        style={{ width: "75%", alignSelf: "center" }}
                      >
                        Delete
                      </Button>
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
                </View>
              </View>
            </View>
            <Divider style={styles.profileSocialDivider} />
            <Button
              onPress={() => {
                navigation.push("Edit Profile");
              }}
              status="info"
              style={styles.logoutButton}
            >
              Edit Profile
            </Button>
            <Button
              onPress={onLogout}
              status="danger"
              style={styles.logoutButton}
            >
              Logout
            </Button>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
};

export default ProfileSettings;

const styles = StyleService.create({
  contentContainer: {
    flex: 1,
    //backgroundColor: "background-basic-color-2",
  },
  header: {
    padding: 16,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "column",
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileLocationContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  profileLocation: {
    marginBottom: 5,
    textAlign: "center"
  },
  profileSocialsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 8,
  },
  profileUserName: {
    textAlign: "center",
    marginBottom: 5
  },
  profileStats: {
    flex: "space-between",
  },
  profileStats: {
    flexDirection: "row",
  },
  statBlock: {
    textAlign: "center",
    fontWeight: "800",
    padding: 15,
    flexDirection: "column",
  },
  profileInformation: {
    textAlign: "left",
    marginBottom: 12,
  },
  logoutButton: {
    //position: 'absolute',
    width: "75%",
    alignSelf: "center",
    marginTop: "5%",
    margin: 16,
  },
  editProfileButton: {
    width: "100%",
    alignSelf: "center",
    margin: 10,
  },
  pollButton: {
    width: 100,
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "A7A7A7",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  pollButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
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
  questionHeader: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 10,
  },
  pollsHeader: {
    textAlign: "center",
    fontSize: 30
  }
});
