import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const CircleIcon = ({ icon }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} color={colors.white} size={20} />
    </View>
  );
};

export default CircleIcon;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
