import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { FONTS, SHADOWS } from "../constants";

const AdminCard = ({ source, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <Image resizeMode="contain" style={styles.image} source={source} />
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminCard;

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: 90,
  },
  mainContainer: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "50%",
    minWidth: 140,
    ...SHADOWS.dark,
  },
  titleText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: colors.black,
    marginTop: 5,
  },
});
