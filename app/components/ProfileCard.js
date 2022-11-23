import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { FONTS } from "../constants/index";
import AppButton from "./AppButton";

const ProfileCard = ({ name = "driver", onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/icons/pro.png")}
        />
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.name}>Name: {"  " + name}</Text>
        <AppButton title="Driver Profile" onPress={onPress} />
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  name: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    marginVertical: 5,
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
