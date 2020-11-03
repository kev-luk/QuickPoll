import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const PollChart = () => {

    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFFFFF",
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View>
            <BarChart
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    )
}

export default PollChart

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
    },
});