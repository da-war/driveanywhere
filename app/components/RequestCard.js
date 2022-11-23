import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SHADOWS } from "../constants/index";
import AppButton from "./AppButton";

const RequestCard = ({ images = [], name, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>Requested By: {"   " + name}</Text>
        <Text style={styles.text}>Images Attached:{"   " + images.length}</Text>
      </View>
      <AppButton title="Details" onPress={onPress} />
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    justifyContent: "space-between",
    borderRadius: 15,
    ...SHADOWS.medium,
  },
  text: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
});
