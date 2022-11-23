import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { FONTS } from "../constants";
import { UserContext } from "../context/userContext";

const CheckHome = ({ navigation }) => {
  const userData = React.useContext(UserContext);
  const handlePress = () => {
    if (userData.isDriver) {
      navigation.navigate("isaDriver");
    } else {
      navigation.navigate("notaDriver");
    }
  };
  return (
    <ImageBackground
      blurRadius={10}
      style={{ flex: 1 }}
      source={require("../../assets/check.jpg")}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Welcome to the app!</Text>
        <AppButton
          title="Continue"
          onPress={handlePress}
          style={styles.btn}
          color={colors.secondary}
        />
      </View>
    </ImageBackground>
  );
};

export default CheckHome;

const styles = StyleSheet.create({
  absolute: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondary,
    opacity: 0.2,
  },
  btn: {
    minWidth: 150,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: colors.white,
    fontFamily: FONTS.bold,
  },
});
