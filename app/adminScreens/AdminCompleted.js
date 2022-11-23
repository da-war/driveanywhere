import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import CompletedRidesNavigator from "../navigation/admin/CompletedRidesNavigator";

const AdminCompleted = () => {
  const navigation = useNavigation();
  return (
    <AppScreen>
      <AppHeader title="Completed Rides" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <CompletedRidesNavigator />
      </View>
    </AppScreen>
  );
};

export default AdminCompleted;

const styles = StyleSheet.create({});
