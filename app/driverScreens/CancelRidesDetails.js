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

const CancelRidesDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  return (
    <AppScreen>
      <AppHeader title="Ride Details" onPress={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text adjustsFontSizeToFit style={styles.rideTitle}>
            This ride was rejected by You
          </Text>
          <Text style={styles.rideTitle}>Ride# {data.tripId}</Text>
          <WithHeading heading="Trip Date:" data={data.date} />
          <WithHeading heading="Trip Time:" data={data.time} />
          <WithHeading heading="Pickup Location:" data={data.arrivalLocation} />
          <WithHeading heading="Destination:" data={data.destination} />
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default CancelRidesDetails;

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
