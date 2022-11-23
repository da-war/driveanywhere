import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppButton from "../components/AppButton";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <AppScreen>
      <ImageBackground
        blurRadius={10}
        style={styles.background}
        source={require("../../assets/images/welcome.jpg")}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.absoluteContainer}>
          <AppButton
            title="Register"
            color={COLORS.primary}
            onPress={() => navigation.navigate("register")}
          />
          <AppButton
            title="Login"
            color={COLORS.secondary}
            onPress={() => navigation.navigate("login")}
          />
        </View>
      </ImageBackground>
    </AppScreen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  background: {
    flex: 1,
  },
  logo: {
    width: 175,
    height: 175,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    right: 0,
    left: 0,
    backgroundColor: COLORS.white,
    marginHorizontal: "20%",
    borderRadius: 50,
    height: 200,
    justifyContent: "center",
  },
});
