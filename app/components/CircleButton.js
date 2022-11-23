import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS } from "../constants";
import colors from "../config/colors";

const CircleButton = ({
  title = "title",
  bgColor = colors.primary,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity style={{ borderRadius: 75 }} onPress={onPress}>
      <View style={[styles.mainContainer, { backgroundColor: bgColor }]}>
        <MaterialCommunityIcons name={icon} size={30} color={colors.white} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 64,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: colors.white,
  },
});
