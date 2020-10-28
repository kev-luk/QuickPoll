import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { List, ListElement, ListProps } from "@ui-kitten/components";

const CategoryList = (props) => {
  //const { hint, ...listProps } = props;

  return (
    <View style={{ height: 260, width: 130, marginLeft: 20 }}>
      <View style={{ flex: 2 }}>
        <Image
          source={{ uri: props.imageUri }}
          style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{props.date}</Text>
      </View>
    </View>
  );
};
export default CategoryList;

const styles = StyleSheet.create({
  hint: {
    margin: 16,
  },
});
