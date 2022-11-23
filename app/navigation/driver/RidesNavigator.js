import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RequestedRides from "../../driverScreens/rides/RequestedRides";
import InProgressRides from "../../driverScreens/rides/InProgressRides";

import UpcomingScreen from "../../driverScreens/rides/UpcomingRides";
import { COLORS } from "../../constants";

const Tab = createMaterialTopTabNavigator();

const RidesNavigator = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Requested" component={RequestedRides} />
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
      <Tab.Screen name="In-Progress" component={InProgressRides} />
    </Tab.Navigator>
  );
};

export default RidesNavigator;

const styles = StyleSheet.create({});
