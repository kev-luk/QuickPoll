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
import answerList from "./AnswerList"

const CreatePost = () => {
    const [answerValue, setAnswerValue] = useState('')
    const [answers, setAnswers] = useState([])

    const addAnswer = () => {
        if (value.length > 0) {
            setAnswers(...answers, { text: value, key: index })
            setAnswerValue('')
        }
    }

    const deleteAnswer = index => {
        setAnswers(
            answers.filter(answer => {
                if (answer.key !== index) return true;
            })
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.formContainer}>
                        <Input
                            style={styles.formInput}
                            status="control"
                            autoCapitalize="words"
                            placeholder="Title of your poll"
                        />
                        <Input
                            style={styles.formInput}
                            status="control"
                            placeholder="Add an answer"
                            value={answerValue}
                            onChange={value => setAnswerValue(value)}
                        />

                        <TouchableOpacity>
                            <Icon name='plus' onPress={() => { addAnswer() }} />
                        </TouchableOpacity>

                        {
                            answers.map(item => {
                                <answerList
                                    text={item.text}
                                    deleteAnswer={() => deleteAnswer(item.key)}
                                />
                            })
                        }
                    </View>
                    <Button
                        style={styles.signUpButton}
                        size="giant"
                    >
                        Create Poll
                    </Button>
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
        backgroundColor: "#14A085"
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    formInput: {
        marginTop: 16,
    },
    signUpButton: {
        marginHorizontal: 16,
    },
});