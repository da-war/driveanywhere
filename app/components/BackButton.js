import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.circleContainer}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={20}
          color={COLORS.dark}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  circleContainer: {
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
