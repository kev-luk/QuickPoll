import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "@ui-kitten/components";

const SettingCard = (props) => {
  const {
    style,
    hint,
    children,
    destination,
    navigation,
    ...touchableOpacityProps
  } = props;

  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={1.0}
        {...touchableOpacityProps}
        style={[styles.container, style]}
        onPress={() => navigation.navigate(destination)}
      >
        <Text category="s2">{hint}</Text>
        {children}
      </TouchableOpacity>
      <Divider style={{ backgroundColor: "grey" }} />
    </React.Fragment>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
