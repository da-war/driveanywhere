import React from "react";
import { StyleSheet, Text } from "react-native";
import { FONTS } from "../../constants";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red", fontFamily: FONTS.light, fontSize: 12 },
});

export default ErrorMessage;
