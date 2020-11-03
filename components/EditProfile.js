import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = () => {
    return (
        <Layout style={{ flex: 1 }} level="1">
            <ScrollView>
                <View style={styles.header}>
                    <Text>Edit Profile</Text>
                </View>
            </ScrollView>
        </Layout>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
    },
});