import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLabel } from "victory-native";

const PollChart = () => {

    const data = {
        pollResults: [
            { x: 'Rap', y: '25' },
            { x: 'Country', y: '50' },
            { x: 'Classical', y: '75' },
            { x: 'Jazz', y: '100' },
        ]
    }

    return (
        <View>
            <VictoryChart
                domainPadding={{ x: 25 }}>
                <VictoryGroup>
                    <VictoryBar
                        data={data.pollResults}
                        style={{
                            data: {
                                fill: 'blue'
                            }
                        }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    />
                </VictoryGroup>
            </VictoryChart>
        </View>
    )
}

export default PollChart

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
    },
});