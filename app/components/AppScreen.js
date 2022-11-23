import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const AppScreen = ({ children, style }) => {
  return <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>;
};

export default AppScreen;

const styles = StyleSheet.create({});
