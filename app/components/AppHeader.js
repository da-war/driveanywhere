import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";

import AppIcon from "./AppIcon";
import { COLORS, FONTS } from "../constants";

const AppHeader = ({ icon = "chevron-left", title = "title", onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <AppIcon color={COLORS.secondary} icon={icon} size={24} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  iconContainer: {
    width: 27,
    height: 27,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginLeft: 12,
  },
});
