import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { FONTS } from "../constants";

const FilterButton = ({
  onPress,
  title,
  bgColor = colors.dark,
  color = colors.white,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.text, { color: color }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingHorizontal: 10,
    width: 135,
    marginHorizontal: 7,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    textTransform: "uppercase",
  },
});
