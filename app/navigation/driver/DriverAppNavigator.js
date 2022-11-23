import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DriverStackNavigator from "./DriverStackNavigator";
import ProfileScreen from "./ProfileScreen";
import AppIcon from "../../components/AppIcon";
import colors from "../../config/colors";
import { COLORS } from "../../constants";
import { StateContext } from "../../context/StateContext";
import AdminAppNavigator from "../admin/AdminAppNavigator";

import { UserContext } from "../../context/userContext";

import useNotifications from "../../hooks/useNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();

const DriverAppNavigator = () => {
  const { state, setState } = React.useContext(StateContext);
  const { user, setUser } = React.useContext(UserContext);

  useNotifications();

  //add token to user in context
  if (state === "driver") {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: COLORS.secondary,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveBackgroundColor: colors.white,
          tabBarInactiveTintColor: colors.medium,
        }}
      >
        <Tab.Screen
          name="Home"
          component={DriverStackNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <AppIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <AppIcon color={color} size={size} icon="account" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (state === "admin") {
    return <AdminAppNavigator />;
  }
};

export default DriverAppNavigator;

const styles = StyleSheet.create({});
