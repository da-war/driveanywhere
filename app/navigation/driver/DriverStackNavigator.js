import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../driverScreens/HomeScreen";
import RidesNavigator from "./RidesNavigator";
import RidesScreen from "../../driverScreens/RidesScreen";
import ApplyForDriverScreen from "../../notDriverScreens/ApplyForDriverScreen";
import UpcomingDetailsScreen from "../../driverScreens/UpcomingDetailsScreen";
import CompletedRides from "../../driverScreens/CompletedRides";
import InProgressTripPage from "../../driverScreens/InProgressTripPage";
import StayAddScreen from "../../driverScreens/StayAddScreen";
import ReportProblem from "../../driverScreens/ReportProblem";
import CanceledRides from "../../driverScreens/CanceledRides";
import FaqScreen from "../../driverScreens/FaqScreen";
import { CommentsScreen } from "../../driverScreens/CommentsScreen";
import StayListScreen from "../../global/StayListScreen";
import InProgressRides from "../../driverScreens/rides/InProgressRides";
import CompletedRidesDetails from "../../global/CompletedRidesDetails";
import CancelRidesDetails from "../../driverScreens/CancelRidesDetails";
import TipsScreen from "../../driverScreens/TipsScreen";

const Stack = createNativeStackNavigator();

const DriverStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sdhome" component={HomeScreen} />
      <Stack.Screen name="sdrides" component={RidesScreen} />

      <Stack.Screen name="notdriver" component={ApplyForDriverScreen} />

      <Stack.Screen name="upcomingdetails" component={UpcomingDetailsScreen} />
      <Stack.Screen name="completedrides" component={CompletedRides} />
      <Stack.Screen name="canceledrides" component={CanceledRides} />
      <Stack.Screen name="inprogress" component={InProgressRides} />
      <Stack.Screen name="inprogressdetails" component={InProgressTripPage} />
      <Stack.Screen name="stayscreen" component={StayAddScreen} />
      <Stack.Screen name="staylist" component={StayListScreen} />
      <Stack.Screen name="reportproblem" component={ReportProblem} />
      <Stack.Screen name="faqs" component={FaqScreen} />
      <Stack.Screen name="commentscreen" component={CommentsScreen} />

      <Stack.Screen name="completedDetails" component={CompletedRidesDetails} />
      <Stack.Screen name="cancelledDetails" component={CancelRidesDetails} />
      <Stack.Screen name="tipscreen" component={TipsScreen} />
    </Stack.Navigator>
  );
};

export default DriverStackNavigator;

const styles = StyleSheet.create({});
