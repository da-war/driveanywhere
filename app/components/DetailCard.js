import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const DetailCard = ({ detail, title }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.normalText}>{detail}</Text>
      </View>
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  innerContainer: {
    padding: 5,
    backgroundColor: colors.light,
  },
  mainContainer: {
    padding: 10,
  },
});
