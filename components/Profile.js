import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
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
                <Text category="h4" style={styles.profileUserName}>QuickPoll</Text>
                <View style={styles.profileLocationContainer}>
                  <View style={styles.profileStats}>
                    <View style={styles.statBlock}>
                      <Text>
                        10 Followers
                      </Text>
                    </View>
                    <View style={styles.statBlock}>
                      <Text>
                        8 Polls
                      </Text>
                    </View>
                    <View style={styles.statBlock}>
                      <Text>
                        2020
                      </Text>
                      <Text>
                        Responses
                      </Text>
                    </View>
                  </View>
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
    textAlign: "center"
  },
  profileStats: {
    flex: "space-between"
  },
  profileStats: {
    flexDirection: 'row'
  },
  statBlock: {
    textAlign: 'center',
    fontWeight: 800,
    padding: 15,
    flexDirection: 'column'
  },
  profileInformation: {
    textAlign: "left",
    marginBottom: 12,
  }
});
