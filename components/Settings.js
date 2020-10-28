import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Layout } from "@ui-kitten/components";
import SettingCard from "./SettingCard";

const Setting = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <SettingCard
          navigation={props.navigation}
          destination="Privacy"
          style={styles.setting}
          hint="Privacy"
        />
        <SettingCard
          navigation={props.navigation}
          destination="Terms And Conditions"
          style={styles.setting}
          hint="Terms and Conditions"
        />
      </Layout>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 15,
  },
  setting: {
    padding: 16,
  },
  section: {
    paddingTop: 32,
  },
});
