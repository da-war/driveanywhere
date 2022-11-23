import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import React from "react";
import AppIcon from "./AppIcon";
import colors from "../config/colors";
import RoundIcon from "./RoundIcon";
import { FONTS } from "../constants/index";

const ProfileDetailCard = ({
  onPress,
  bgColor,
  icon = "home",
  title = "ProfileDetailCard",
  cSwitch,
  toggleSwitch,
  isEnabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <RoundIcon bgColor={bgColor} icon={icon} />
        <Text style={styles.texto}>{title}</Text>
        {cSwitch && (
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileDetailCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    position: "absolute",
    right: 10,
  },
  texto: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    marginLeft: 10,
  },
});
