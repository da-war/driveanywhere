import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS } from "../constants/theme";
import colors from "../config/colors";

const ChatCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Sipho</Text>
        <Text style={styles.text}> I'm on My Way</Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    marginVertical: 3,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    marginHorizontal: 7,
  },
  textContainer: {
    justifyContent: "center",
  },
  textHeading: {
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
});
