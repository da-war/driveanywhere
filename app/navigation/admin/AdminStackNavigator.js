import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../adminScreens/HomeScreen";
import CreateTrip from "../../adminScreens/CreateTrip";
import DriverProfile from "../../adminScreens/DriverProfile";
import DriverDetailsScreen from "../../adminScreens/DriverDetailsScreen";
import DriverRequests from "../../driverScreens/DriverRequests";
import RequestDetailsScreen from "../../adminScreens/RequestDetailsScreen";
import ImageDetailScreen from "../../global/ImageDetailScreen";
import InProgressRidesAdmin from "../../adminScreens/InProgressRidesAdmin";
import InProgressDetails from "../../adminScreens/InProgressDetails";
import { CommentsScreen } from "../../driverScreens/CommentsScreen";
import AdminRidesNavigator from "./AdminRidesNavigator";
import AdminRides from "../../adminScreens/AdminRides";
import PendingDetailsScreen from "../../adminScreens/PendingDetailsScreen";
import UpcomingDetailsScreenAdmin from "../../adminScreens/UpcomingDetailsScreenAdmin";
import AdminCompleted from "../../adminScreens/AdminCompleted";
import CompletedRidesDetails from "../../global/CompletedRidesDetails";
import RejectedRides from "../../adminScreens/RejectedRides";
import AdminReportedProblems from "../../adminScreens/AdminReportedProblems";

const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adminHome" component={HomeScreen} />
      <Stack.Screen name="createtrip" component={CreateTrip} />
      <Stack.Screen name="driverprofile" component={DriverProfile} />
      <Stack.Screen name="driverdetails" component={DriverDetailsScreen} />
      <Stack.Screen name="driverrequests" component={DriverRequests} />
      <Stack.Screen name="imagedetails" component={ImageDetailScreen} />

      <Stack.Screen
        name="driverrequestdetails"
        component={RequestDetailsScreen}
      />
      <Stack.Screen name="inProgress" component={InProgressRidesAdmin} />
      <Stack.Screen name="inProgressDetail" component={InProgressDetails} />
      <Stack.Screen name="admincomment" component={CommentsScreen} />
      <Stack.Screen name="adminRides" component={AdminRides} />
      <Stack.Screen name="pendingDetails" component={PendingDetailsScreen} />
      <Stack.Screen
        name="upcomingDetails"
        component={UpcomingDetailsScreenAdmin}
      />
      <Stack.Screen name="adminmycomplete" component={AdminCompleted} />
      <Stack.Screen
        name="completedDetailsAdmin"
        component={CompletedRidesDetails}
      />
      <Stack.Screen name="rejectedRides" component={RejectedRides} />
      <Stack.Screen
        name="adminreportedproblems"
        component={AdminReportedProblems}
      />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;

const styles = StyleSheet.create({});
