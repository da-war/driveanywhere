import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import { COLORS, FONTS } from "../constants";
import { auth } from "../../firebase";

const ApplicationScreen = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={10}
      style={{ flex: 1 }}
      source={require("../../assets/background.jpg")}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Complete the form to get rides</Text>
        <AppButton
          title="Submit Application"
          style={{ paddingHorizontal: 30, marginVertical: 35 }}
          color={COLORS.secondary}
          onPress={() => navigation.navigate("notDriverForm")}
        />
        <AppButton
          title="Logout"
          onPress={() => auth.signOut()}
          color={COLORS.red}
        />
      </View>
    </ImageBackground>
  );
};

export default ApplicationScreen;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginTop: 50,
    color: COLORS.white,
  },
});
