import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather"
import {
    Button,
    Input,
    Text,
    Modal,
    Layout,
} from "@ui-kitten/components";

const answerList = (props) => {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.listItem}>{props.text}</Text>
            <Icon
                name='trash-2'
                size='24'
                color='red'
                onPress={props.deleteAnswer}
            />
        </View>
    )
}

export default answerList

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: '#aaaaaa',
        borderBottomWidth: 1.5,
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40
    },
    listItem: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        borderColor: 'green',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    }
});