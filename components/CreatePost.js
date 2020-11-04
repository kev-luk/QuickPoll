import React, { useState } from "react";
import { Text, Button, TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather"
import theme from "../theme.json";
import AnswerList from "./AnswerList";

const CreatePost = () => {
    const [answerValue, setAnswerValue] = useState('')
    const [answers, setAnswers] = useState([])

    const addAnswer = () => {
        if (answerValue.length > 0) {
            setAnswers(...answers, { text: answerValue })
            setAnswerValue('')
        }
    }

    // const deleteAnswer = id => {
    //     setAnswers(
    //         answers.filter(answer => {
    //             if (answer.key !== id) return true;
    //         })
    //     );
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.formInput}
                            status="control"
                            autoCapitalize="words"
                            placeholder="Title of your poll"
                        />
                        <TextInput
                            style={styles.formInput}
                            status="control"
                            autoCapitalize="words"
                            placeholder="Enter tags that describe your poll"
                        />
                        <TextInput
                            style={styles.formInput}
                            status="control"
                            placeholder="Add an answer"
                            value={answerValue}
                            onChangeText={answerValue => setAnswerValue(answerValue)}
                        />

                        <TouchableOpacity onPress={() => { addAnswer() }} >
                            <Icon
                                name='plus'
                                size={30}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <ScrollView style={{ width: '95%' }}>
                        {
                            answers.map(item => {
                                <AnswerList
                                    text={item.text}
                                // key={item.key}
                                // deleteAnswer={() => deleteAnswer(item.key)}
                                />
                            })
                        }
                    </ScrollView> */}
                    <TouchableOpacity style={styles.createButton}>
                        <Text style={styles.createButtonText}>Create Poll</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: theme["color-primary-500"],
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    formInput: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BBBBBB',
    },
    createButton: {
        marginHorizontal: 16,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#14A085',
        alignItems: 'center'
    },
    createButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
    }
});