import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";
import colors from "../config/colors";
const AppButton = ({
  title = "",
  onPress,
  color = colors.primary,
  textColor = COLORS.white,
  style,
  mh,
  icon,
  iconSize = 20,
  minWidth,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { backgroundColor: color, marginHorizontal: mh },
          style,
          minWidth,
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={iconSize}
            color={colors.white}
          />
        )}
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.text, { color: textColor }]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minWidth: 120,
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    textTransform: "uppercase",
  },
});
