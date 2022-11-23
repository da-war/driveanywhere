import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const RoundIcon = ({ icon = "home", bgColor = colors.black }) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name={icon} size={20} color={colors.white} />
    </View>
  );
};

export default RoundIcon;

const styles = StyleSheet.create({
  mainContainer: {
    width: 30,
    height: 30,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
