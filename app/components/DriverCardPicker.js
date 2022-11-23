import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/index";
import colors from "../config/colors";

const DriverCardPicker = ({ driverName, trips, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/icons/pro.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <View>
          <Text>Driver Name: {driverName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCardPicker;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.light,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
});
