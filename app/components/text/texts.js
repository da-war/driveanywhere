import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES } from "../../constants/index";
import colors from "../../config/colors";

export const RegularText = ({ children, style }) => {
  return <Text style={[styles.regularText, style]}>{children}</Text>;
};
export const LightText = ({ children, style }) => {
  return <Text style={[styles.lightText, style]}>{children}</Text>;
};
export const MediumText = ({ children, style }) => {
  return <Text style={[styles.mediumText, style]}>{children}</Text>;
};
export const LargeText = ({ children, style }) => {
  return <Text style={[styles.largeText, style]}>{children}</Text>;
};
export const ExtraLargeText = ({ children, style }) => {
  return <Text style={[styles.extraLargeText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  lightText: {
    fontSize: SIZES.base,
    fontFamily: FONTS.light,
    color: colors.gray,
  },
  regularText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: colors.gray,
  },
  mediumText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: colors.gray,
  },
  largeText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: colors.gray,
  },
  extraLargeText: {
    fontSize: SIZES.extraLarge,
    fontFamily: FONTS.regular,
    color: colors.gray,
  },
});
