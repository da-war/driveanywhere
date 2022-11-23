import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { FONTS } from "../constants";
import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", style, ...otherProps }) {
  return (
    <View style={[styles.container, { width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 9,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.light,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    flex: 1,
  },
});

export default AppTextInput;
