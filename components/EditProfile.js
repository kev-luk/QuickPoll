import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/firestore";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const dbh = firebase.firestore();

  const updateProfile = () => {
    dbh.collection('users').doc(firebase.auth().currentUser.uid).set({
      name: name,
      bio: bio,
    })

    Alert.alert("Profile Updated!")
  }

  return (
    <Layout style={{ flex: 1 }} level="1">
      <ScrollView>
        <View style={styles.header}>
          <Input
            style={[styles.profileSetting, styles.section]}
            value={name}
            label="Name"
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Input
            style={[styles.profileSetting, styles.section]}
            value={bio}
            label="Bio"
            onChangeText={(text) => {
              setBio(text);
            }}
          />
          <Button
            style={styles.doneButton}
            status="info"
            onPress={() => {
              updateProfile()
              navigation.pop()
            }
            }
          >
            Update Profile
          </Button>
          <Button
            style={styles.doneButton}
            status="danger"
            onPress={() => navigation.pop()}
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    //backgroundColor: theme["color-primary-500"],
  },
  contentContainer: {
    paddingVertical: 24,
  },
  errorMessageText: {
    alignSelf: "center",
    fontSize: 20,
  },
  titleText: {
    alignSelf: "center",
    fontSize: 30,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: "center",
    paddingTop: 40,
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 15,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalExitButton: {
    width: "40%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  modalMessageText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  diffModalView: {
    position: "absolute",
    //bottom: 2,
    width: "90%",
    height: "30%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 7,
  },
  modalView: {
    position: "absolute",
    //bottom: 2,
    width: "90%",
    height: "22%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 7,
    //borderColor: theme["color-primary-500"],
    //borderWidth: 2,
  },
});
