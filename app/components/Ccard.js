import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { FONTS, SHADOWS } from "../constants/index";

const Ccard = ({ rideNumber, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Ride#: {rideNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Ccard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    marginVertical: 5,
    borderColor: colors.light,
    ...SHADOWS.dark,
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: colors.gray,
  },
});
