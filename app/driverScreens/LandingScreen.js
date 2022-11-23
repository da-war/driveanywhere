import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../../assets/background.jpg")}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.absolute}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("login")}
          />
          <AppButton
            title="Register"
            color={colors.secondary}
            onPress={() => navigation.navigate("register")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    marginHorizontal: 17,
  },
  background: {
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginVertical: 45,
  },
  imageContainer: {
    width: 230,
    height: 230,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.white,
    marginVertical: 45,
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
  },
});
