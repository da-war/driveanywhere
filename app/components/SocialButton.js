import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { EvilIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const SocialButton = ({ icon, bgColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <EvilIcons name={icon} size={40} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
});
