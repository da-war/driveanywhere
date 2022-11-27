import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../driver/ProfileScreen";
import AdminStackNavigator from "./AdminStackNavigator";

import AppIcon from "../../components/AppIcon";
import { COLORS } from "../../constants/index";
import useNotifications from "../../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AdminAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
      }}
    >
      <Tab.Screen
        name="Admin Home"
        component={AdminStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AppIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AppIcon color={color} size={size} icon="account" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminAppNavigator;

const styles = StyleSheet.create({});
