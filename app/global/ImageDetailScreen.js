import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import colors from "../config/colors";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppScreen from "../components/AppScreen";

const ImageDetailScreen = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  return (
    <AppScreen>
      <AppHeader title="Image Details" onPress={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: data }}
          />
        </View>
      </View>
    </AppScreen>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
});
