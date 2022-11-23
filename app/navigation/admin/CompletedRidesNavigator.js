import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdminRequestedRides from "../../adminScreens/AdminRequestedRides";
import AdminUpcomingRides from "../../adminScreens/AdminUpcomingRides";
import { COLORS } from "../../constants/index";
import AdminReports from "../../adminScreens/AdminReports";
import AdminCompletedRides from "../../adminScreens/AdminCompletedRides";

const TopNav = createMaterialTopTabNavigator();

const CompletedRidesNavigator = () => {
  return (
    <TopNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
          height: 4,
        },
        tabBarStyle: {
          borderWidth: 1,
          borderColor: COLORS.primary,
        },
      }}
    >
      <TopNav.Screen name="Completed Rides" component={AdminCompletedRides} />
      <TopNav.Screen name="Get Reports" component={AdminReports} />
    </TopNav.Navigator>
  );
};

export default CompletedRidesNavigator;

const styles = StyleSheet.create({});
