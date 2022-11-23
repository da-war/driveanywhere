import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SHADOWS } from "../constants";
import { FONTS } from "../constants/index";

const TipsScreen = () => {
  const navigation = useNavigation();

  const myTips = [
    {
      id: 1,
      title: "Tip 1",
      //advice for seatbelt
      description:
        "Always wear your seatbelt. It is the law and it can save your life.",
    },
    {
      id: 2,
      title: "Tip 2",
      description: "Follow the speed limit.",
    },
    {
      id: 3,
      title: "Tip 3",
      description: "Follow the traffic rules.",
    },
    {
      id: 4,
      title: "Tip 4",
      description: "Do not drink and drive.",
    },
    {
      id: 5,
      title: "Tip 5",
      description: "Do not use your phone while driving.",
    },
  ];
  return (
    <AppScreen>
      <AppHeader title="Tips" onPress={() => navigation.goBack()} />
      <View style={styles.mainContainer}>
        <FlatList
          data={myTips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </AppScreen>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
});
