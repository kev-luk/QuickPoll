import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, View, Image, TouchableOpacity } from "react-native";
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
import { AuthContext } from "./context";
import { TextStyleProps } from "@ui-kitten/components/devsupport";

const ProfileSettings = (props) => {
  const { signOut } = React.useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    recieveUser().then(() => setRefreshing(false));
  }, []);

  const onLogout = () => {
    signOut();
  };

  useEffect(() => {
    setTimeout(() => {
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
                <Text category="h4" style={styles.profileUserName}>
                  QuickPoll
                </Text>
                <View style={styles.profileLocationContainer}>
                  <View style={styles.profileStats}>
                    <View style={styles.statBlock}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        10
                      </Text>
                      <Text>Followers</Text>
                    </View>
                    <View style={styles.statBlock}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        8
                      </Text>
                      <Text>Polls</Text>
                    </View>
                    <View style={styles.statBlock}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        2020
                      </Text>
                      <Text>Responses</Text>
                    </View>
                  </View>
                  <Button style={styles.editProfileButton}>Edit Profile</Button>
                  <View style={styles.profileInformation}>
                    <Text
                      style={styles.profileLocation}
                      appearance="hint"
                      category="s1"
                    >
                      John Doe
                    </Text>
                    <Text>
                      Welcome to QuickPoll! Checkout and respond to my polls!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Divider style={styles.profileSocialDivider} />
            <TouchableOpacity style={styles.pollButton}>
              <Text style={styles.pollButtonText}>Which movie is better?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pollButton}>
              <Text style={styles.pollButtonText}>Favorite color?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pollButton}>
              <Text style={styles.pollButtonText}>Best artist of 2020?</Text>
            </TouchableOpacity>
            <Button
              onPress={onLogout}
              style={styles.logoutButton}
            //status="danger"
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
  },
  profileSocialsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 8,
  },
  profileUserName: {
    textAlign: "center",
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
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: "A7A7A7",
    borderWidth: 1,
    alignItems: 'center',
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
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
});
