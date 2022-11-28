import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { FONTS, SHADOWS, COLORS } from "../constants/index";
import AppButton from "./AppButton";

const Ccard = ({ rideNumber, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text adjustsFontSizeToFit style={styles.text}>
          Ride#: {rideNumber}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <AppButton onPress={onPress} title="Details" />
      </View>
    </View>
  );
};

export default Ccard;

const styles = StyleSheet.create({
  btnContainer: {
    maxWidth: "45%",
  },
  mainContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 3,
    marginVertical: 5,
    borderColor: colors.light,
    ...SHADOWS.dark,
  },
  titleContainer: {
    padding: 7,
    backgroundColor: colors.black,
    borderRadius: 10,
    minWidth: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: colors.white,
  },
});
