import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, COLORS } from "../constants/index";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { TripsContext } from "../context/tripsContext";
import moment from "moment";

import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import * as Sharing from "expo-sharing";

const AdminReports = () => {
  const { trips, setTrips } = React.useContext(TripsContext);

  const completedTrips = trips.filter(
    (trip) => trip.requestStatus === "completed"
  );

  const generateExcel = async (tripsEntered) => {
    const headers = [
      "Driver Name",
      "Driver Email",
      "Driver Phone",
      "Driver Id",
      "Number of Stays",
      "Pick Up Location",
      "Destination",
      "Date",
      "Time",
      "Trip Id",
      "Completed At:",
    ];
    const mainArray = [];
    //get name, email, phone, id, isDriver from each object in drivers array and store it in an array and push it to mainArray
    tripsEntered.forEach((trip) => {
      const tripsArray = [
        trip.driver.name,
        trip.driver.email,
        trip.driver.phone,
        trip.driver.id,
        trip.stays.length,
        trip.arrivalLocation,
        trip.destination,
        trip.date,
        trip.time,
        trip.tripId,
        trip.completedTime,
      ];
      mainArray.push(tripsArray);
    });
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([headers, ...mainArray]);
    XLSX.utils.book_append_sheet(wb, ws, "Trips", true);

    const base64 = await XLSX.write(wb, { type: "base64" });
    const fileName = FileSystem.documentDirectory + "Trips.xlsx";
    await FileSystem.writeAsStringAsync(fileName, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(fileName);
    });
  };

  const getAllTime = () => {
    //get trips from completedTrips where completedTime is within the last 30 days using moment.js
    //get the total amount of trips
    //start code here
    if (completedTrips.length > 0) {
      generateExcel(completedTrips);
    } else {
      Alert.alert("No trips in the last 30 days");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Get Excel File for</Text>
        <Text style={styles.titleBig}>Completed Rides</Text>
      </View>

      <View style={styles.btnContainer}>
        <AppButton
          title="Generate File"
          color={COLORS.gray}
          onPress={getAllTime}
        />
      </View>
    </View>
  );
};

export default AdminReports;

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: colors.gray,
  },
  titleBig: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: colors.gray,
  },
  titleContainer: {
    marginVertical: 12,
  },
});
