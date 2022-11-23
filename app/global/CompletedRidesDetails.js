import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants/index";
import colors from "../config/colors";
import WithHeading from "../components/WithHeading";
import { ScrollView } from "react-native";
import AppButton from "../components/AppButton";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const CompletedRidesDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  const generatePdf = async (data) => {
    //generate pdf onClick with expo print and expo sharing
    const result = await printToFileAsync({ html: htmlContent, base64: false });
    if (result) {
      await shareAsync(result.uri);
    } else {
      Alert.alert("Error in generating pdf");
    }
  };

  const htmlContent = `
    <html>
        <body>
            <h1><b>Trip ID:</b> ${data.tripId}</h1>
            <p><b>Trip Date:</b> ${data.date}</p>
            <p><b>Trip Time:</b> ${data.time}</p>
            <p><b>Trip Completed At:</b> ${data.completedTime}</p>
            <p><b>Pick Up Location:</b> ${data.arrivalLocation}</p>
            <p><b>Destination:</b> ${data.destination}</p>
            <p><b>Driver Name:</b>${data.driver.name}</p>
            <p><b>Driver Phone Number:</b> ${data.driver.phone}</p>
            <p><b>Passenger Name:</b> ${data.passengerName}</p>
            <p><b>Total Stays:</b>${data.stays.length}</p>
        </body>
    </html>
    `;
  return (
    <AppScreen>
      <AppHeader title="Ride Details" onPress={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.rideTitle}>Ride# {data.tripId}</Text>
          <WithHeading heading="Trip Date:" data={data.date} />
          <WithHeading heading="Trip Time:" data={data.time} />
          <WithHeading heading="Pickup Location:" data={data.arrivalLocation} />
          <WithHeading heading="Destination:" data={data.destination} />
          <WithHeading heading="Completed At:" data={data.completedTime} />
          <Text style={styles.stayTitle}>Stays</Text>
          <View style={styles.stayContainer}>
            {data.stays.length < 1 ? (
              <Text style={styles.stayTextNo}>No Stays of this ride</Text>
            ) : (
              data.stays.map((stay, index) => (
                <View key={index} style={styles.stay}>
                  <Text style={styles.stayText}>Stay# {index + 1}</Text>
                  <WithHeading heading="Stay Title:" data={stay.title} />

                  <WithHeading heading="Stay duration:" data={stay.totalTime} />
                  <WithHeading
                    heading="Stay Location:"
                    data={stay.description}
                    numOfLines={3}
                  />
                </View>
              ))
            )}
          </View>

          <View style={styles.btnContainer}>
            <AppButton title="Get PDF" onPress={generatePdf} />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default CompletedRidesDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 17,
  },
  rideTitle: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    color: colors.gray,
    textAlign: "center",
    marginVertical: 12,
  },
  stay: {
    padding: 12,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.light,
  },
  stayContainer: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 15,
    borderRadius: 20,
  },
  stayTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginTop: 20,
    marginBottom: 10,
  },
  stayText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  stayTextNo: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: colors.gray,
    textAlign: "center",
    width: "100%",
  },
});
