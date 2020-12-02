import React, { useEffect, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  LogBox
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
  Avatar
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
  const [name, setName] = useState("")
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("")
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfileInfo()
    getData()
    setRefreshing(false);
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

  const getProfileInfo = () => {
    dbh
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setName(doc.data().name)
          setLocation(doc.data().location)
          setBio(doc.data().bio)
        } else {
          console.log("No information")
        }
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  // get polls that have same uuid
  const getData = () => {
    dbh
      .collection("posts")
      .where("author", "==", firebase.auth().currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const recievedPosts = querySnapshot.docs.map((doc) => doc.data());
          setPosts(recievedPosts);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

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
        <Text style={styles.pollButtonText}>{item.title}</Text>
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
      getProfileInfo()
      getData();
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
                <Text category="h3" style={styles.profileUserName}>
                  {name}
                </Text>
                <View style={styles.profilePicContainer}>
                  <Avatar
                    source={{
                      uri: firebase.auth().currentUser.photoURL
                    }}
                    size="large"
                    style={{
                      borderColor: theme["color-primary-transparent-600"],
                      borderWidth: 2
                    }}
                  />
                </View>
                <View style={styles.profileLocationContainer}>
                  <View style={styles.profileInformation}>
                    <Text
                      style={styles.profileLocation}
                      appearance="hint"
                    >
                      {location}
                    </Text>
                    <Text
                      style={styles.bioContainer}
                    >
                      {bio}
                    </Text>
                    <Button
                      onPress={() => {
                        navigation.push("Edit Profile");
                      }}
                      status="info"
                      style={styles.editProfileButton}
                    >
                      Edit Profile
            </Button>
                    <Divider style={styles.profileSocialDivider} />
                    <Text style={styles.pollsHeader}>My Polls</Text>
                    <FlatList
                      keyExtractor={(item) => item.id}
                      data={posts}
                      renderItem={({ item, index }) => {
                        return renderList(item, index);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Divider style={styles.profileSocialDivider} />
            <Button
              onPress={onLogout}
              status="danger"
              style={styles.logoutButton}
            >
              Logout
            </Button>
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
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{ width: "75%", alignSelf: "center", marginBottom: 15 }}
              >
                Close
              </Button>
            </View>
          </Modal>
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
    justifyContent: "center",
  },
  profileLocation: {
    marginVertical: 10,
    textAlign: "center",
  },
  bioContainer: {
    textAlign: "center",
    fontSize: 15
  },
  profileSocialsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 8,
  },
  profileUserName: {
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold"
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
    margin: "5%",
  },
  editProfileButton: {
    width: "100%",
    alignSelf: "center",
    margin: "5%",
  },
  pollButton: {
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#C7C7C7",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  pollButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  tab: {
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
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 5
  },
  profilePicContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
