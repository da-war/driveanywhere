import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdminRequestedRides from "../../adminScreens/AdminRequestedRides";
import AdminUpcomingRides from "../../adminScreens/AdminUpcomingRides";
import { COLORS } from "../../constants/index";

const TopNav = createMaterialTopTabNavigator();

const AdminRidesNavigator = () => {
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
      <TopNav.Screen name="Requested Rides" component={AdminRequestedRides} />
      <TopNav.Screen name="Upcoming Rides" component={AdminUpcomingRides} />
    </TopNav.Navigator>
  );
};

export default AdminRidesNavigator;

const styles = StyleSheet.create({});
