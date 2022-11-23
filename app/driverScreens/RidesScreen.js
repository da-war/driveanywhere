import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RidesNavigator from "../navigation/driver/RidesNavigator";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

const RidesScreen = () => {
  const navigation = useNavigation();
  return (
    <AppScreen>
      <AppHeader title="My Rides" onPress={() => navigation.goBack()} />
      <RidesNavigator />
    </AppScreen>
  );
};

export default RidesScreen;

const styles = StyleSheet.create({});
