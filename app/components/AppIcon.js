import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const AppIcon = ({ icon = "home", size = 25, color = COLORS.primary }) => {
  return <MaterialCommunityIcons name={icon} size={size} color={color} />;
};

export default AppIcon;

const styles = StyleSheet.create({});
