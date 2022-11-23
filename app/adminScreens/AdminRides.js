import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants";
import AdminCard from "../components/AdminCard";
import AdminRidesNavigator from "../navigation/admin/AdminRidesNavigator";

const AdminRides = () => {
  const navigation = useNavigation();
  return (
    <AppScreen>
      <AppHeader title="App Rides" onPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <AdminRidesNavigator />
      </View>
    </AppScreen>
  );
};

export default AdminRides;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    alignSelf: "center",
  },
});
