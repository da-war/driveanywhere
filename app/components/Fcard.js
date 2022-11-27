import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";

const Fcard = ({ question, answer }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>{question}</Text>
      </View>
      <Text style={styles.text}>{answer}</Text>
    </View>
  );
};

export default Fcard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: colors.white,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: colors.dark,
  },
  headingTextContainer: {
    padding: 2,
    backgroundColor: colors.secondary,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
